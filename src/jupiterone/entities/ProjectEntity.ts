import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const PROJECT_ENTITY_TYPE = "openshift_project";
export const PROJECT_ENTITY_CLASS = "Project";

export interface ProjectEntity extends EntityFromIntegration {
  uid: string;
  resourceVersion: string;
  generation?: number;
  namespace?: string;
  creationTimestamp: number;
}
