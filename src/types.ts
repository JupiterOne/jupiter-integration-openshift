import {
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";
import OpenShiftClient from "./openshift/OpenShiftClient";

export interface OpenShiftExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  openshift: OpenShiftClient;
}
