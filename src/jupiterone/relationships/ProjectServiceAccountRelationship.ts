import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface ProjectServiceAccountRelationship
  extends RelationshipFromIntegration {
  id?: number;
}

export const PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_TYPE =
  "openshift_project_has_service_account";
export const PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_CLASS = "HAS";
