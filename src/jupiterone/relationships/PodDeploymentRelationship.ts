import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface PodDeploymentRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const POD_DEPLOYMENT_RELATIONSHIP_TYPE = "openshift_pod_has_deployment";
export const POD_DEPLOYMENT_RELATIONSHIP_CLASS = "HAS";
