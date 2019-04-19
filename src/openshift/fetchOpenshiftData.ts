import OpenShiftClient from "./OpenShiftClient";
import { NamespaceData, OpenshiftDataModel, Project } from "./types";

export default async function fetchOpenshiftData(client: OpenShiftClient): Promise<OpenshiftDataModel> {
  const [groups, projects, users] = await Promise.all([client.fetchGroups(), client.fetchProjects(), client.fetchUsers()]);

  const namespaces = await Promise.all(projects.map((project: Project) => fetchNamespaceData(project, client)));

  return { groups, projects, users, namespaces };
}

async function fetchNamespaceData(project: Project, client: OpenShiftClient): Promise<NamespaceData> {
  const namespace = project.metadata.name;
  const [serviceAccounts, services, pods, routes] = await Promise.all([
    client.fetchNamespaceServiceAccounts(namespace),
    client.fetchNamespaceServices(namespace),
    client.fetchNamespacePods(namespace),
    client.fetchNamespaceRoutes(namespace),
  ]);

  return {
    project,
    serviceAccounts,
    services,
    pods,
    routes,
  };
}
