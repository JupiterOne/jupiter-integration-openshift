import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface ProjectDeploymentRelationship
  extends RelationshipFromIntegration {
  id?: number;
}

export const PROJECT_DEPLOYMENT_RELATIONSHIP_TYPE =
  "openshift_project_has_deployment";
export const PROJECT_DEPLOYMENT_RELATIONSHIP_CLASS = "HAS";
