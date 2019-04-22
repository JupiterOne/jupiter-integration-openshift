import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface ProjectRouteRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const PROJECT_ROUTE_RELATIONSHIP_TYPE = "openshift_project_has_route";
export const PROJECT_ROUTE_RELATIONSHIP_CLASS = "HAS";
