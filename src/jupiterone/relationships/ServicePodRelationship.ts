import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface ServicePodRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const SERVICE_POD_RELATIONSHIP_TYPE = "openshift_service_has_pod";
export const SERVICE_POD_RELATIONSHIP_CLASS = "HAS";
