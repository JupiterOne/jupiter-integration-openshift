import {
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";
import OpenShiftClient from "./openshift/OpenShiftClient";
import { OpenShiftExecutionContext } from "./types";

export default async function initializeContext(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<OpenShiftExecutionContext> {
  const {
    instance: { config },
  } = context;

  const openshift = new OpenShiftClient();
  await openshift.authorize(
    config.apiToken,
    config.cluster,
    config.insecureSkipTlsVerify === true,
  );

  return {
    ...context,
    ...context.clients.getClients(),
    openshift,
  };
}
