import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface ProjectPodRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const PROJECT_POD_RELATIONSHIP_TYPE = "openshift_project_has_pod";
export const PROJECT_POD_RELATIONSHIP_CLASS = "HAS";
