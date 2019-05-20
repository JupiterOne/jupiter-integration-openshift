import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const ROUTE_ENTITY_TYPE = "openshift_route";
export const ROUTE_ENTITY_CLASS = "Domain";

export interface RouteEntity extends EntityFromIntegration {
  uid: string;
  name: string;
  resourceVersion: string;
  namespace?: string;
  createdOn: number;
  host: string;
}
