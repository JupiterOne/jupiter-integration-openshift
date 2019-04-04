import {
  EntityFromIntegration,
  IntegrationInstance,
  RelationshipFromIntegration,
} from "@jupiterone/jupiter-managed-integration-sdk";
import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AccountEntity,
  GROUP_ENTITY_CLASS,
  GROUP_ENTITY_TYPE,
  GroupEntity,
  PROJECT_ENTITY_CLASS,
  PROJECT_ENTITY_TYPE,
  ProjectEntity,
} from "./types";

export function createAccountEntity(
  instance: IntegrationInstance,
  cluster: string,
): AccountEntity {
  return {
    _class: ACCOUNT_ENTITY_CLASS,
    _key: instance.id,
    _type: ACCOUNT_ENTITY_TYPE,
    displayName: instance.name,
    cluster,
  };
}

export function createProjectEntities(data: any[]): ProjectEntity[] {
  return data.map(d => ({
    _class: PROJECT_ENTITY_CLASS,
    _key: `provider-user-${d.id}`,
    _type: PROJECT_ENTITY_TYPE,
    displayName: `${d.firstName} ${d.lastName}`,
    uid: d.uid,
    groups: d.groups,
  }));
}

export function createGroupEntities(data: any[]): GroupEntity[] {
  return data.map(d => ({
    _class: GROUP_ENTITY_CLASS,
    _key: `provider-device-id-${d.id}`,
    _type: GROUP_ENTITY_TYPE,
    deviceId: d.id,
    displayName: d.manufacturer,
    uid: d.uid,
    namespace: d.namespace,
    generation: d.generation,
    resourceVersion: d.resourceVersion,
  }));
}

export function createAccountRelationships(
  account: AccountEntity,
  entities: EntityFromIntegration[],
  type: string,
) {
  const relationships = [];
  for (const entity of entities) {
    relationships.push(createAccountRelationship(account, entity, type));
  }

  return relationships;
}

export function createAccountRelationship(
  account: AccountEntity,
  entity: EntityFromIntegration,
  type: string,
): RelationshipFromIntegration {
  return {
    _class: "HAS",
    _fromEntityKey: account._key,
    _key: `${account._key}_has_${entity._key}`,
    _toEntityKey: entity._key,
    _type: type,
  };
}
