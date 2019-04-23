import {
  EntityFromIntegration,
  EntityOperation,
  PersisterClient,
  RelationshipOperation,
} from "@jupiterone/jupiter-managed-integration-sdk";

import * as EntityConverters from "../converters/entities";
import * as RelationshipConverters from "../converters/relationships";
import * as Entities from "../jupiterone/entities";
import * as Relationships from "../jupiterone/relationships";

import { IntegrationInstance } from "@jupiterone/jupiter-managed-integration-sdk";
import {
  JupiterOneDataModel,
  JupiterOneEntitiesData,
  JupiterOneRelationshipsData,
} from "../jupiterone";

import { OpenshiftDataModel } from "../openshift/types";

type EntitiesKeys = keyof JupiterOneEntitiesData;
type RelationshipsKeys = keyof JupiterOneRelationshipsData;

export default async function publishChanges(
  persister: PersisterClient,
  oldData: JupiterOneDataModel,
  openshiftData: OpenshiftDataModel,
  instance: IntegrationInstance,
) {
  const newData = convert(openshiftData, instance);

  const entities = createEntitiesOperations(
    oldData.entities,
    newData.entities,
    persister,
  );
  const relationships = createRelationshipsOperations(
    oldData.relationships,
    newData.relationships,
    persister,
  );

  return await persister.publishPersisterOperations([entities, relationships]);
}

function createEntitiesOperations(
  oldData: JupiterOneEntitiesData,
  newData: JupiterOneEntitiesData,
  persister: PersisterClient,
): EntityOperation[] {
  const defatultOperations: EntityOperation[] = [];
  const entities: EntitiesKeys[] = Object.keys(oldData) as EntitiesKeys[];

  return entities.reduce((operations, entityName) => {
    const oldEntities = oldData[entityName];
    const newEntities = newData[entityName];

    return [
      ...operations,
      ...persister.processEntities<EntityFromIntegration>(
        oldEntities,
        newEntities,
      ),
    ];
  }, defatultOperations);
}

function createRelationshipsOperations(
  oldData: JupiterOneRelationshipsData,
  newData: JupiterOneRelationshipsData,
  persister: PersisterClient,
): RelationshipOperation[] {
  const defatultOperations: RelationshipOperation[] = [];
  const relationships: RelationshipsKeys[] = Object.keys(
    oldData,
  ) as RelationshipsKeys[];

  return relationships.reduce((operations, relationshipName) => {
    const oldRelationhips = oldData[relationshipName];
    const newRelationhips = newData[relationshipName];

    return [
      ...operations,
      ...persister.processRelationships(oldRelationhips, newRelationhips),
    ];
  }, defatultOperations);
}

export function convert(
  openshiftDataModel: OpenshiftDataModel,
  instance: IntegrationInstance,
): JupiterOneDataModel {
  const entities = convertEntities(openshiftDataModel, instance);
  const relationships = convertRelationships(openshiftDataModel, entities);

  return {
    entities,
    relationships,
  };
}

export function convertEntities(
  openshiftDataModel: OpenshiftDataModel,
  instance: IntegrationInstance,
): JupiterOneEntitiesData {
  return {
    accounts: [EntityConverters.createAccountEntity(instance)],
    groups: EntityConverters.createGroupEntities(openshiftDataModel.groups),
    projects: EntityConverters.createProjectEntities(
      openshiftDataModel.projects,
    ),
    pods: EntityConverters.createPodEntities(openshiftDataModel.namespaces),
    containers: EntityConverters.createContainerEntities(
      openshiftDataModel.namespaces,
    ),
    routes: EntityConverters.createRouteEntities(openshiftDataModel.namespaces),
    services: EntityConverters.createServiceEntities(
      openshiftDataModel.namespaces,
    ),
    serviceAccounts: EntityConverters.createServiceAccountEntities(
      openshiftDataModel.namespaces,
    ),
    users: EntityConverters.createUserEntities(openshiftDataModel.users),
  };
}

export function convertRelationships(
  openshiftDataModel: OpenshiftDataModel,
  entities: JupiterOneEntitiesData,
): JupiterOneRelationshipsData {
  const account = entities.accounts[0];

  const projectRouteRelationships = RelationshipConverters.createNamespaceRelationships(
    openshiftDataModel.namespaces,
    "routes",
    Entities.ROUTE_ENTITY_TYPE,
    Relationships.PROJECT_ROUTE_RELATIONSHIP_TYPE,
    Relationships.PROJECT_ROUTE_RELATIONSHIP_CLASS,
  );

  const projectServiceAccountRelationships = RelationshipConverters.createNamespaceRelationships(
    openshiftDataModel.namespaces,
    "services",
    Entities.SERVICE_ENTITY_TYPE,
    Relationships.PROJECT_SERVICE_RELATIONSHIP_TYPE,
    Relationships.PROJECT_SERVICE_RELATIONSHIP_CLASS,
  );

  const projectServiceRelationships = RelationshipConverters.createNamespaceRelationships(
    openshiftDataModel.namespaces,
    "serviceAccounts",
    Entities.SERVICE_ACCOUNT_ENTITY_TYPE,
    Relationships.PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_TYPE,
    Relationships.PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_CLASS,
  );

  return {
    accountGroupRelationships: RelationshipConverters.createAccountGroupRelationships(
      openshiftDataModel.groups,
      account,
    ),
    accountProjectRelationships: RelationshipConverters.createAccountProjectRelationships(
      openshiftDataModel.projects,
      account,
    ),
    userGroupRelationships: RelationshipConverters.createUserGroupRelationships(
      openshiftDataModel.groups,
      openshiftDataModel.users,
    ),
    projectRouteRelationships,
    projectServiceAccountRelationships,
    projectServiceRelationships,
    routeServiceRelationships: RelationshipConverters.createRouteServiceRelationships(
      openshiftDataModel.namespaces,
    ),
    podContainerRelationships: RelationshipConverters.createPodContainerRelationships(
      openshiftDataModel.namespaces,
    ),
    servicePodRelationships: RelationshipConverters.createServicePodRelationships(
      openshiftDataModel.namespaces,
    ),
  };
}
