import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import initializeContext from "./initializeContext";

import fetchEntitiesAndRelationships from "./jupiterone/fetchEntitiesAndRelationships";
import fetchOpenshiftData from "./openshift/fetchOpenshiftData";
import publishChanges from "./persister/publishChanges";

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<IntegrationExecutionResult> {
  const { instance, graph, persister, openshift } = await initializeContext(
    context,
  );

  const oldData = await fetchEntitiesAndRelationships(graph);
  const openshiftData = await fetchOpenshiftData(openshift);

  return {
    operations: await publishChanges(
      persister,
      oldData,
      openshiftData,
      instance,
    ),
  };
}
