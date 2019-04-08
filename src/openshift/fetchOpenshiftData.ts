import OpenShiftClient from "./OpenShiftClient";
import { OpenshiftDataModel } from "./types";

export default async function fetchOpenshiftData(
  client: OpenShiftClient,
): Promise<OpenshiftDataModel> {
  const [groups, projects] = await Promise.all([
    client.fetchGroups(),
    client.fetchProjects(),
  ]);

  return { groups, projects };
}
