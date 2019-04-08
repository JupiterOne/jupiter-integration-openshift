import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface AccountGroupRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const ACCOUNT_GROUP_RELATIONSHIP_TYPE = "openshift_account_user_group";
export const ACCOUNT_GROUP_RELATIONSHIP_CLASS = "HAS";
