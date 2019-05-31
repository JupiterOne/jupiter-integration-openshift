import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const GROUP_ENTITY_TYPE = "openshift_user_group";
export const GROUP_ENTITY_CLASS = "UserGroup";

export interface GroupEntity extends EntityFromIntegration {
  uid: string;
  resourceVersion: string;
  generation?: number;
  namespace?: string;
  createdOn: number;
}
