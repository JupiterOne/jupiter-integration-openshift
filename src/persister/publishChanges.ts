import {
  EntityFromIntegration,
  EntityOperation,
  PersisterClient,
  RelationshipOperation,
} from "@jupiterone/jupiter-managed-integration-sdk";

import {
  createAccountEntity,
  createAccountGroupRelationships,
  createAccountProjectRelationships,
  createGroupEntities,
  createProjectEntities,
  createUserEntities,
  createUserGroupRelationships,
} from "../converters";

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
    accounts: [createAccountEntity(instance)],
    groups: createGroupEntities(openshiftDataModel.groups),
    projects: createProjectEntities(openshiftDataModel.projects),
    users: createUserEntities(openshiftDataModel.users),
  };
}

export function convertRelationships(
  openshiftDataModel: OpenshiftDataModel,
  entities: JupiterOneEntitiesData,
): JupiterOneRelationshipsData {
  const account = entities.accounts[0];

  return {
    accountGroupRelationships: createAccountGroupRelationships(
      openshiftDataModel.groups,
      account,
    ),
    accountProjectRelationships: createAccountProjectRelationships(
      openshiftDataModel.projects,
      account,
    ),
    userGroupRelationships: createUserGroupRelationships(
      openshiftDataModel.groups,
      openshiftDataModel.users,
    ),
  };
}
