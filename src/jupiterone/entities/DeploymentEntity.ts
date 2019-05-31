import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const DEPLOYMENT_ENTITY_TYPE = "openshift_deployment";
export const DEPLOYMENT_ENTITY_CLASS = ["Deployment", "Group"];

export interface DeploymentEntity extends EntityFromIntegration {
  name: string;
  isActive: boolean;
  createdOn: number;
}
