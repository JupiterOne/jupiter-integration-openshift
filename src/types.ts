import {
  EntityFromIntegration,
  GraphClient,
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";
import OpenShiftClient from "./OpenShiftClient";

export const ACCOUNT_ENTITY_TYPE = "openshift_account";
export const ACCOUNT_ENTITY_CLASS = "Account";

export const PROJECT_ENTITY_TYPE = "openshift_user";
export const PROJECT_ENTITY_CLASS = "User";
export const ACCOUNT_PROJECT_RELATIONSHIP_TYPE = "openshift_account_user";

export const GROUP_ENTITY_TYPE = "openshift_user_group";
export const GROUP_ENTITY_CLASS = "UserGroup";
export const ACCOUNT_GROUP_RELATIONSHIP_TYPE = "openshift_account_user_group";

export interface AccountEntity extends EntityFromIntegration {
  cluster: string;
}

export interface ProjectEntity extends EntityFromIntegration {
  uid: string;
  groups: string[];
}

export interface GroupEntity extends EntityFromIntegration {
  uid: string;
  namespace: string;
  resourceVersion: string;
  generation: number;
}

export interface OpenShiftExecutionContext
  extends IntegrationExecutionContext<IntegrationInvocationEvent> {
  graph: GraphClient;
  persister: PersisterClient;
  openshift: OpenShiftClient;
}
