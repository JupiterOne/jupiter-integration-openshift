import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface AccountProjectRelationship
  extends RelationshipFromIntegration {
  id?: number;
}

export const ACCOUNT_PROJECT_RELATIONSHIP_TYPE = "openshift_account_project";
export const ACCOUNT_PROJECT_RELATIONSHIP_CLASS = "HAS";
