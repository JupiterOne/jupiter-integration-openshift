import { GraphClient } from "@jupiterone/jupiter-managed-integration-sdk";
import * as Entities from "./entities";
import * as Relationships from "./relationships";

export interface JupiterOneEntitiesData {
  accounts: Entities.AccountEntity[];
  groups: Entities.GroupEntity[];
  projects: Entities.ProjectEntity[];
  users: Entities.UserEntity[];
  pods: Entities.PodEntity[];
  services: Entities.ServiceEntity[];
  routes: Entities.RouteEntity[];
  serviceAccounts: Entities.ServiceAccountEntity[];
  containers: Entities.ContainerEntity[];
}

export interface JupiterOneRelationshipsData {
  accountGroupRelationships: Relationships.AccountGroupRelationship[];
  accountProjectRelationships: Relationships.AccountProjectRelationship[];
  projectRouteRelationships: Relationships.ProjectRouteRelationship[];
  projectServiceAccountRelationships: Relationships.ProjectServiceAccountRelationship[];
  projectServiceRelationships: Relationships.ProjectServiceRelationship[];
  routeServiceRelationships: Relationships.RouteServiceRelationship[];
  servicePodRelationships: Relationships.ServicePodRelationship[];
  podContainerRelationships: Relationships.PodContainerRelationship[];
  userGroupRelationships: Relationships.UserGroupRelationship[];
}

export interface JupiterOneDataModel {
  entities: JupiterOneEntitiesData;
  relationships: JupiterOneRelationshipsData;
}

export default async function fetchEntitiesAndRelationships(graph: GraphClient): Promise<JupiterOneDataModel> {
  const data: JupiterOneDataModel = {
    entities: await fetchEntities(graph),
    relationships: await fetchRelationships(graph),
  };

  return data;
}

async function fetchEntities(graph: GraphClient): Promise<JupiterOneEntitiesData> {
  const [accounts, groups, users, serviceAccounts] = await Promise.all([
    graph.findEntitiesByType<Entities.AccountEntity>(Entities.ACCOUNT_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.GroupEntity>(Entities.GROUP_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.UserEntity>(Entities.USER_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.ServiceAccountEntity>(Entities.SERVICE_ACCOUNT_ENTITY_TYPE),
  ]);

  const [projects, pods, services, routes, containers] = await Promise.all([
    graph.findEntitiesByType<Entities.ProjectEntity>(Entities.PROJECT_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.PodEntity>(Entities.POD_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.ServiceEntity>(Entities.SERVICE_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.RouteEntity>(Entities.ROUTE_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.ContainerEntity>(Entities.CONTAINER_ENTITY_TYPE),
  ]);

  return {
    accounts,
    groups,
    projects,
    users,
    pods,
    services,
    routes,
    serviceAccounts,
    containers,
  };
}

export async function fetchRelationships(graph: GraphClient): Promise<JupiterOneRelationshipsData> {
  const [accountGroupRelationships, accountProjectRelationships, userGroupRelationships] = await Promise.all([
    graph.findRelationshipsByType<Relationships.AccountGroupRelationship>(Relationships.ACCOUNT_GROUP_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.AccountProjectRelationship>(Relationships.ACCOUNT_PROJECT_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.UserGroupRelationship>(Relationships.USER_GROUP_RELATIONSHIP_TYPE),
  ]);

  const [
    projectRouteRelationships,
    projectServiceAccountRelationships,
    projectServiceRelationships,
    routeServiceRelationships,
    servicePodRelationships,
    podContainerRelationships,
  ] = await Promise.all([
    graph.findRelationshipsByType<Relationships.ProjectRouteRelationship>(Relationships.PROJECT_ROUTE_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.ProjectServiceAccountRelationship>(Relationships.PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.ProjectServiceRelationship>(Relationships.PROJECT_SERVICE_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.RouteServiceRelationship>(Relationships.ROUTE_SERVICE_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.ServicePodRelationship>(Relationships.SERVICE_POD_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType<Relationships.PodContainerRelationship>(Relationships.POD_CONTAINER_RELATIONSHIP_TYPE),
  ]);

  return {
    accountGroupRelationships,
    accountProjectRelationships,
    projectRouteRelationships,
    projectServiceAccountRelationships,
    projectServiceRelationships,
    routeServiceRelationships,
    servicePodRelationships,
    userGroupRelationships,
    podContainerRelationships,
  };
}
