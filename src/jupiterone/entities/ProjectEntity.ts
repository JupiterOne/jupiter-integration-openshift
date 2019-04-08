import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const PROJECT_ENTITY_TYPE = "openshift_user";
export const PROJECT_ENTITY_CLASS = "User";

export interface ProjectEntity extends EntityFromIntegration {
  uid: string;
}
