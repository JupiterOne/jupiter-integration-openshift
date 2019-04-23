// tslint:disable:no-var-requires
const openshiftRestClient = require("openshift-rest-client").OpenshiftClient;

import {
  Group,
  Pod,
  Project,
  Route,
  Service,
  ServiceAccount,
  User,
} from "./types";

export default class OpenShiftClient {
  private restClient: any;

  public async authenticate(
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
    try {
      const {
        body: { items: groups },
      } = await this.restClient.apis["user.openshift.io"].v1.groups.get();

      return groups;
    } catch (e) {
      if (e.statusCode === 403) {
        return [];
      }

      throw e;
    }
  }

  public async fetchProjects(): Promise<Project[]> {
    const {
      body: { items: projects },
    } = await this.restClient.apis["project.openshift.io"].v1.projects.get();

    return projects;
  }

  public async fetchUsers(): Promise<User[]> {
    try {
      const {
        body: { items: users },
      } = await this.restClient.apis["user.openshift.io"].v1.users.get();

      return users;
    } catch (e) {
      if (e.statusCode === 403) {
        return [];
      }

      throw e;
    }
  }

  public async fetchNamespaceServiceAccounts(
    namespace: string,
  ): Promise<ServiceAccount[]> {
    const {
      body: { items: serviceAccounts },
    } = await this.restClient.api.v1
      .namespaces(namespace)
      .serviceaccounts.get();

    return serviceAccounts;
  }

  public async fetchNamespaceRoutes(namespace: string): Promise<Route[]> {
    const {
      body: { items: routes },
    } = await this.restClient.apis["route.openshift.io"].v1
      .namespaces(namespace)
      .routes.get();

    return routes;
  }

  public async fetchNamespacePods(namespace: string): Promise<Pod[]> {
    const {
      body: { items: pods },
    } = await this.restClient.api.v1.namespaces(namespace).pods.get();

    return pods;
  }

  public async fetchNamespaceServices(namespace: string): Promise<Service[]> {
    const {
      body: { items: services },
    } = await this.restClient.api.v1.namespaces(namespace).services.get();

    return services;
  }
}
