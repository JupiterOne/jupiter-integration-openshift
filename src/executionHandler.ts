import {
  IntegrationActionName,
  IntegrationExecutionContext,
  IntegrationExecutionResult,
} from "@jupiterone/jupiter-managed-integration-sdk";

import initializeContext from "./initializeContext";
import fetchEntitiesAndRelationships from "./jupiterone/fetchEntitiesAndRelationships";
import fetchOpenshiftData from "./openshift/fetchOpenshiftData";
import publishChanges from "./persister/publishChanges";
import { OpenShiftExecutionContext } from "./types";

export default async function executionHandler(
  context: IntegrationExecutionContext,
): Promise<IntegrationExecutionResult> {
  const actionFunction = ACTIONS[context.event.action.name];
  if (actionFunction) {
    return await actionFunction(await initializeContext(context));
  } else {
    return {};
  }
}

async function synchronize(
  context: OpenShiftExecutionContext,
): Promise<IntegrationExecutionResult> {
  const { instance, graph, persister, openshift } = context;

  context.logger.info("Fetching existing entities and relationships...");
  const oldData = await fetchEntitiesAndRelationships(graph);
  context.logger.info("Fetched existing entities and relationships.");

  context.logger.info("Fetching new entities and relationships...");
  const openshiftData = await fetchOpenshiftData(openshift);
  context.logger.info("Fetched new entities and relationships.");

  context.logger.info("Publishing changes...");

  const operations = await publishChanges(
    persister,
    oldData,
    openshiftData,
    instance,
  );
  context.logger.info(
    {
      operations,
    },
    "Published changes",
  );

  return {
    operations,
  };
}

type ActionFunction = (
  context: OpenShiftExecutionContext,
) => Promise<IntegrationExecutionResult>;

interface ActionMap {
  [actionName: string]: ActionFunction | undefined;
}

const ACTIONS: ActionMap = {
  [IntegrationActionName.INGEST]: synchronize,
};
