import {
  IntegrationActionName,
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import initializeContext from "./initializeContext";
import fetchEntitiesAndRelationships from "./jupiterone/fetchEntitiesAndRelationships";
import fetchOpenshiftData from "./openshift/fetchOpenshiftData";
import publishChanges from "./persister/publishChanges";
import { OpenShiftExecutionContext } from "./types";

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<IntegrationExecutionResult> {
  const actionFunction = ACTIONS[context.event.action.name];
  if (actionFunction) {
    return await actionFunction(await initializeContext(context));
  } else {
    return {};
  }
}

async function synchronize(context: OpenShiftExecutionContext): Promise<IntegrationExecutionResult> {
  const { instance, graph, persister, openshift } = context;

  const oldData = await fetchEntitiesAndRelationships(graph);
  const openshiftData = await fetchOpenshiftData(openshift);

  return {
    operations: await publishChanges(persister, oldData, openshiftData, instance),
  };
}

type ActionFunction = (context: OpenShiftExecutionContext) => Promise<IntegrationExecutionResult>;

interface ActionMap {
  [actionName: string]: ActionFunction | undefined;
}

const ACTIONS: ActionMap = {
  [IntegrationActionName.INGEST]: synchronize,
};
