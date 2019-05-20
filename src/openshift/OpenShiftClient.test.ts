import nock from "nock";
import OpenShiftClient from "./OpenShiftClient";

const TOKEN =
  process.env.OPENSHIFT_LOCAL_EXECUTION_API_TOKEN || "example_token";
const CLUSTER =
  process.env.OPENSHIFT_LOCAL_EXECUTION_CLUSTER || "192.168.64.3:8443";

const EXAMPLE_NAMESPACE = process.env.EXAMPLE_NAMESPACE || "example_namespace";

function prepareScope(def: nock.NockDefinition) {
  def.scope = `https://${CLUSTER}`;
}

describe("OpenShiftClient fetch ok data", () => {
  beforeAll(() => {
    nock.back.fixtures = `${__dirname}/../../test/fixtures/`;
    process.env.CI
      ? nock.back.setMode("lockdown")
      : nock.back.setMode("record");
  });

  async function getAuthenticatedClient() {
    const openshift = new OpenShiftClient();
    await openshift.authenticate(TOKEN, CLUSTER, true);

    return openshift;
  }

  test("fetchGroups ok", async () => {
    const { nockDone } = await nock.back("groups-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchGroups();
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchGroups 403", async () => {
    const { nockDone } = await nock.back("groups-403.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchGroups();
    expect(response.length).toEqual(0);
    nockDone();
  });

  test("fetchGroups 404", async () => {
    const { nockDone } = await nock.back("groups-404.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    try {
      await client.fetchGroups();
    } catch (e) {
      expect(e instanceof Error).toBe(true);
    }
    nockDone();
  });

  test("fetchProjects ok", async () => {
    const { nockDone } = await nock.back("projects-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchProjects();
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchUsers ok", async () => {
    const { nockDone } = await nock.back("users-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchUsers();
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchUsers 403", async () => {
    const { nockDone } = await nock.back("users-403.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchUsers();
    expect(response.length).toEqual(0);
    nockDone();
  });

  test("fetchUsers 404", async () => {
    const { nockDone } = await nock.back("users-404.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    try {
      await client.fetchUsers();
    } catch (e) {
      expect(e instanceof Error).toBe(true);
    }
    nockDone();
  });

  test("fetchNamespaceServiceAccounts ok", async () => {
    const { nockDone } = await nock.back("namespace-sa-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchNamespaceServiceAccounts(
      EXAMPLE_NAMESPACE,
    );
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchNamespacePods ok", async () => {
    const { nockDone } = await nock.back("namespace-pods-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchNamespacePods(EXAMPLE_NAMESPACE);
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchNamespaceServices ok", async () => {
    const { nockDone } = await nock.back("namespace-serv-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchNamespaceServices(EXAMPLE_NAMESPACE);
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchNamespaceDeployments ok", async () => {
    const { nockDone } = await nock.back("namespace-deployments-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchNamespaceDeployments(EXAMPLE_NAMESPACE);
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  test("fetchNamespaceRoutes ok", async () => {
    const { nockDone } = await nock.back("namespace-routes-ok.json", {
      before: prepareScope,
    });
    const client = await getAuthenticatedClient();
    const response = await client.fetchNamespaceRoutes(EXAMPLE_NAMESPACE);
    expect(response.length).not.toEqual(0);
    nockDone();
  });

  afterAll(() => {
    nock.restore();
  });
});
