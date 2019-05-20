import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const SERVICE_ACCOUNT_ENTITY_TYPE = "openshift_service_account";
export const SERVICE_ACCOUNT_ENTITY_CLASS = "User";

export interface ServiceAccountEntity extends EntityFromIntegration {
  uid: string;
  name: string;
  resourceVersion: string;
  namespace?: string;
  createdOn: number;
}
