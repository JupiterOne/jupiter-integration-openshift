import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface ProjectServiceRelationship
  extends RelationshipFromIntegration {
  id?: number;
}

export const PROJECT_SERVICE_RELATIONSHIP_TYPE =
  "openshift_project_has_service";
export const PROJECT_SERVICE_RELATIONSHIP_CLASS = "HAS";
