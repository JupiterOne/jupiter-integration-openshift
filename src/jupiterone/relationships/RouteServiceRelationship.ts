import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface RouteServiceRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const ROUTE_SERVICE_RELATIONSHIP_TYPE = "openshift_route_extends_service";
export const ROUTE_SERVICE_RELATIONSHIP_CLASS = "EXTENDS";
