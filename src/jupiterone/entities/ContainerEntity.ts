import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const CONTAINER_ENTITY_TYPE = "openshift_container";
export const CONTAINER_ENTITY_CLASS = ["Process", "Workload"];

export interface ContainerEntity extends EntityFromIntegration {
  name: string;
  image: string;
}
