import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const USER_ENTITY_TYPE = "openshift_user";
export const USER_ENTITY_CLASS = "User";

export interface UserEntity extends EntityFromIntegration {
  uid: string;
  resourceVersion: string;
  generation?: number;
  namespace?: string;
  createdOn: number;
  fullName: string;
}
