import OpenShiftClient from "./OpenShiftClient";
import { OpenshiftDataModel } from "./types";

export default async function fetchOpenshiftData(
  client: OpenShiftClient,
): Promise<OpenshiftDataModel> {
  const [groups, projects, users] = await Promise.all([
    client.fetchGroups(),
    client.fetchProjects(),
    client.fetchUsers(),
  ]);

  return { groups, projects, users };
}
