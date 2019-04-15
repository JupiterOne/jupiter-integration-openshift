import nock from "nock";
import OpenShiftClient from "./OpenShiftClient";

const TOKEN =
  process.env.OPENSHIFT_LOCAL_EXECUTION_API_TOKEN || "example_token";
const CLUSTER =
  process.env.OPENSHIFT_LOCAL_EXECUTION_CLUSTER || "192.168.64.3:8443";

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

  afterAll(() => {
    nock.restore();
  });
});
