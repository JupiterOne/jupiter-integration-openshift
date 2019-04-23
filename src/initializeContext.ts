import { IntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";
import OpenShiftClient from "./openshift/OpenShiftClient";
import { OpenShiftExecutionContext } from "./types";

export default async function initializeContext(
  context: IntegrationExecutionContext,
): Promise<OpenShiftExecutionContext> {
  const {
    instance: { config },
  } = context;

  const openshift = new OpenShiftClient();
  await openshift.authenticate(
    config.apiToken,
    config.cluster,
    process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0",
  );

  return {
    ...context,
    ...context.clients.getClients(),
    openshift,
  };
}
