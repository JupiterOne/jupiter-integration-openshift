import {
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";
import openshiftRestClient from "openshift-rest-client";
import OpenShiftClient from "./OpenShiftClient";
import { OpenShiftExecutionContext } from "./types";

export default async function initializeContext(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<OpenShiftExecutionContext> {
  const {
    instance: { config },
  } = context;

  const openshiftClient = await openshiftRestClient({
    config: {
      apiVersion: "v1",
      context: {
        cluster: config.cluster,
        namespace: config.namespace,
        user: config.user,
      },
      user: { token: config.apiToken },
      cluster: `https://${config.cluster}`,
    },
  });

  return {
    ...context,
    ...context.clients.getClients(),
    openshift: new OpenShiftClient(openshiftClient),
  };
}
