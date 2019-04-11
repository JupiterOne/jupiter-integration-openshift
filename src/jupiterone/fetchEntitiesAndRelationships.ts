import { GraphClient } from "@jupiterone/jupiter-managed-integration-sdk";
import * as Entities from "./entities";

export interface JupiterOneEntitiesData {
  accounts: Entities.AccountEntity[];
  groups: Entities.GroupEntity[];
  projects: Entities.ProjectEntity[];
  users: Entities.UserEntity[];
}

export interface JupiterOneRelationshipsData {
  accountProjectRelationships: Entities.AccountProjectRelationship[];
  accountGroupRelationships: Entities.AccountGroupRelationship[];
  userGroupRelationships: Entities.UserGroupRelationship[];
}

export interface JupiterOneDataModel {
  entities: JupiterOneEntitiesData;
  relationships: JupiterOneRelationshipsData;
}

export default async function fetchEntitiesAndRelationships(
  graph: GraphClient,
): Promise<JupiterOneDataModel> {
  const data: JupiterOneDataModel = {
    entities: await fetchEntities(graph),
    relationships: await fetchRelationships(graph),
  };

  return data;
}

async function fetchEntities(
  graph: GraphClient,
): Promise<JupiterOneEntitiesData> {
  const [accounts, groups, projects, users] = await Promise.all([
    graph.findEntitiesByType<Entities.AccountEntity>(
      Entities.ACCOUNT_ENTITY_TYPE,
    ),
    graph.findEntitiesByType<Entities.GroupEntity>(Entities.GROUP_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.ProjectEntity>(
      Entities.PROJECT_ENTITY_TYPE,
    ),
    graph.findEntitiesByType<Entities.UserEntity>(Entities.USER_ENTITY_TYPE),
  ]);

  return {
    accounts,
    groups,
    projects,
    users,
  };
}

export async function fetchRelationships(
  graph: GraphClient,
): Promise<JupiterOneRelationshipsData> {
  const [
    accountGroupRelationships,
    accountProjectRelationships,
    userGroupRelationships,
  ] = await Promise.all([
    graph.findRelationshipsByType<Entities.AccountGroupRelationship>(
      Entities.ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<Entities.AccountProjectRelationship>(
      Entities.ACCOUNT_PROJECT_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<Entities.UserGroupRelationship>(
      Entities.USER_GROUP_RELATIONSHIP_TYPE,
    ),
  ]);

  return {
    accountProjectRelationships,
    accountGroupRelationships,
    userGroupRelationships,
  };
}
