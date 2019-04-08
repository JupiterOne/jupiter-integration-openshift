import openshiftRestClient from "openshift-rest-client";
import { Group, Project } from "./types";

export default class OpenShiftClient {
  constructor(readonly restClient: openshiftRestClient.Client) {}

  public async fetchGroups(): Promise<Group[]> {
    const { items: groups } = await this.restClient.groups.findAll();
    return groups;
  }

  public async fetchProjects(): Promise<Project[]> {
    const { items: projects } = await this.restClient.projects.findAll();
    return projects;
  }
}
