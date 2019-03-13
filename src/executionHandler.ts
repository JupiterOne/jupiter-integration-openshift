import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";
import {
  createAccountEntity,
  createAccountRelationships,
  createGroupEntities,
  createProjectEntities,
} from "./converters";
import initializeContext from "./initializeContext";
import OpenShiftClient from "./OpenShiftClient";
import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_GROUP_RELATIONSHIP_TYPE,
  ACCOUNT_PROJECT_RELATIONSHIP_TYPE,
  AccountEntity,
  GROUP_ENTITY_TYPE,
  GroupEntity,
  PROJECT_ENTITY_TYPE,
  ProjectEntity,
} from "./types";

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<IntegrationExecutionResult> {
  const { instance, graph, persister, openshift } = await initializeContext(
    context,
  );

  const [
    oldAccountEntities,
    oldProjectEntities,
    oldGroupEntities,
    oldAccountRelationships,
    newProjectEntities,
    newGroupEntities,
  ] = await Promise.all([
    graph.findEntitiesByType<AccountEntity>(ACCOUNT_ENTITY_TYPE),
    graph.findEntitiesByType<ProjectEntity>(PROJECT_ENTITY_TYPE),
    graph.findEntitiesByType<GroupEntity>(GROUP_ENTITY_TYPE),
    graph.findRelationshipsByType([
      ACCOUNT_PROJECT_RELATIONSHIP_TYPE,
      ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    ]),
    fetchProjectEntitiesFromProvider(openshift),
    fetchGroupEntitiesFromProvider(openshift),
  ]);

  const accountEntity = createAccountEntity(instance, instance.config.cluster);

  const newAccountRelationships = [
    ...createAccountRelationships(
      accountEntity,
      newProjectEntities,
      ACCOUNT_PROJECT_RELATIONSHIP_TYPE,
    ),
    ...createAccountRelationships(
      accountEntity,
      newGroupEntities,
      ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    ),
  ];

  return {
    operations: await persister.publishPersisterOperations([
      [
        ...persister.processEntities(oldAccountEntities, [accountEntity]),
        ...persister.processEntities(oldProjectEntities, newProjectEntities),
        ...persister.processEntities(oldGroupEntities, newGroupEntities),
      ],
      [
        ...persister.processRelationships(
          oldAccountRelationships,
          newAccountRelationships,
        ),
      ],
    ]),
  };
}

async function fetchProjectEntitiesFromProvider(
  openshift: OpenShiftClient,
): Promise<ProjectEntity[]> {
  return createProjectEntities(await openshift.fetchProjects());
}

async function fetchGroupEntitiesFromProvider(
  openshift: OpenShiftClient,
): Promise<GroupEntity[]> {
  return createGroupEntities(await openshift.fetchGroups());
}
