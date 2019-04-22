import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface PodContainerRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const POD_CONTAINER_RELATIONSHIP_TYPE = "openshift_pod_has_container";
export const POD_CONTAINER_RELATIONSHIP_CLASS = "HAS";
