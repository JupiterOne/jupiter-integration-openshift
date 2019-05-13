import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const POD_ENTITY_TYPE = "openshift_pod";
export const POD_ENTITY_CLASS = "Task";

export interface PodEntity extends EntityFromIntegration {
  uid: string;
  name: string;
  resourceVersion: string;
  namespace?: string;
  creationTimestamp: number;
  nodeName: string;
  phase: string;
  hostIP: string;
  podIP: string;
  startTime: number;
  qosClass: string;
}
