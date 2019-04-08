// tslint:disable:no-empty-interface
import openshiftRestClient from "openshift-rest-client";

export interface Group extends openshiftRestClient.Group {}

export interface Project extends openshiftRestClient.Project {}

export interface OpenshiftDataModel {
  groups: Group[];
  projects: Project[];
}
