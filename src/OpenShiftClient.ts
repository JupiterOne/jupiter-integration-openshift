import openshiftRestClient from "openshift-rest-client";

export default class OpenShiftClient {
  constructor(readonly restClient: openshiftRestClient.Client) {}

  public async fetchGroups(): Promise<openshiftRestClient.Group[]> {
    const { items: groups } = await this.restClient.groups.findAll();
    return groups;
  }

  public async fetchProjects(): Promise<openshiftRestClient.Project[]> {
    const { items: projects } = await this.restClient.projects.findAll();
    return projects;
  }
}
