// tslint:disable:no-var-requires
const openshiftRestClient = require("openshift-rest-client").OpenshiftClient;

import { Group, Project, User } from "./types";

export default class OpenShiftClient {
  private restClient: any;

  public async authorize(
    apiToken: string,
    cluster: string,
    insecureSkipTlsVerify: boolean,
  ) {
    const config = {
      auth: { bearer: apiToken },
      url: `https://${cluster}`,
      insecureSkipTlsVerify,
    };

    this.restClient = await openshiftRestClient({ config });
  }

  public async fetchGroups(): Promise<Group[]> {
    const {
      body: { items: groups },
    } = await this.restClient.apis["user.openshift.io"].v1.groups.get();

    return groups;
  }

  public async fetchProjects(): Promise<Project[]> {
    const {
      body: { items: projects },
    } = await this.restClient.apis["project.openshift.io"].v1.projects.get();

    return projects;
  }

  public async fetchUsers(): Promise<User[]> {
    const {
      body: { items: users },
    } = await this.restClient.apis["user.openshift.io"].v1.users.get();

    return users;
  }
}
