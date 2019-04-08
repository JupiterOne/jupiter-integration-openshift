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
} from "../converters";

import { IntegrationInstance } from "@jupiterone/jupiter-managed-integration-sdk";
import {
  AccountEntity,
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
  oneLoginData: OpenshiftDataModel,
  instance: IntegrationInstance,
) {
  const newData = convert(oneLoginData, instance);

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
  oneLoginDataModel: OpenshiftDataModel,
  instance: IntegrationInstance,
): JupiterOneDataModel {
  const entities = convertEntities(oneLoginDataModel, instance);
  return {
    entities: convertEntities(oneLoginDataModel, instance),
    relationships: convertRelationships(
      oneLoginDataModel,
      entities.accounts[0],
    ),
  };
}

export function convertEntities(
  oneLoginDataModel: OpenshiftDataModel,
  instance: IntegrationInstance,
): JupiterOneEntitiesData {
  return {
    accounts: [createAccountEntity(instance)],
    groups: createGroupEntities(oneLoginDataModel.groups),
    projects: createProjectEntities(oneLoginDataModel.projects),
  };
}

export function convertRelationships(
  oneLoginDataModel: OpenshiftDataModel,
  account: AccountEntity,
): JupiterOneRelationshipsData {
  return {
    accountGroupRelationships: createAccountGroupRelationships(
      oneLoginDataModel.groups,
      account,
    ),
    accountProjectRelationships: createAccountProjectRelationships(
      oneLoginDataModel.projects,
      account,
    ),
  };
}
