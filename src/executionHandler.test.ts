import {
  IntegrationActionName,
  IntegrationExecutionContext,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";

import executionHandler from "./executionHandler";
import initializeContext from "./initializeContext";
import { OpenShiftClient } from "./openshift";

jest.mock("./openshift");

const clients = {
  graph: {
    findEntitiesByType: jest.fn().mockResolvedValue([]),
    findRelationshipsByType: jest.fn().mockResolvedValue([]),
  },
  persister: {
    processEntities: jest.fn().mockReturnValue([]),
    processRelationships: jest.fn().mockReturnValue([]),
    publishEntityOperations: jest.fn().mockResolvedValue({}),
    publishRelationshipOperations: jest.fn().mockResolvedValue({}),
    publishPersisterOperations: jest.fn().mockResolvedValue({}),
  } as PersisterClient,
};

let openshiftClient: OpenShiftClient;
let executionContext: IntegrationExecutionContext;

jest.mock("./initializeContext");

beforeEach(() => {
  openshiftClient = ({
    authenticate: jest.fn().mockReturnValue([]),
    fetchGroups: jest.fn().mockReturnValue([]),
    fetchProjects: jest.fn().mockReturnValue([
      {
        metadata: {
          name: "default",
          selfLink: "/apis/project.openshift.io/v1/projects/default",
          uid: "39537998-5bb8-11e9-8c30-4e620801d617",
          resourceVersion: "1284",
          creationTimestamp: "2019-04-10T17:44:00Z",
          annotations: {
            "openshift.io/sa.scc.mcs": "s0:c7,c4",
            "openshift.io/sa.scc.supplemental-groups": "1000050000/10000",
            "openshift.io/sa.scc.uid-range": "1000050000/10000",
          },
        },
        spec: {
          finalizers: ["kubernetes"],
        },
        status: {
          phase: "Active",
        },
      },
    ]),
    fetchUsers: jest.fn().mockReturnValue([]),
    fetchNamespaceServiceAccounts: jest.fn().mockReturnValue([]),
    fetchNamespaceRoutes: jest.fn().mockReturnValue([]),
    fetchNamespacePods: jest.fn().mockReturnValue([]),
    fetchNamespaceServices: jest.fn().mockReturnValue([]),
    fetchNamespaceDeployments: jest.fn().mockReturnValue([]),
  } as unknown) as OpenShiftClient;

  executionContext = ({
    event: {
      action: {
        name: IntegrationActionName.INGEST,
      },
    },
    ...clients,
    openshift: openshiftClient,
    instance: {
      config: {},
    },
  } as unknown) as IntegrationExecutionContext;

  (initializeContext as jest.Mock).mockReturnValue(executionContext);
});

describe("INGEST", () => {
  test("all openshift data", async () => {
    await executionHandler(executionContext);

    expect(openshiftClient.fetchGroups).toHaveBeenCalledTimes(1);
    expect(openshiftClient.fetchProjects).toHaveBeenCalledTimes(1);
    expect(openshiftClient.fetchNamespaceServiceAccounts).toHaveBeenCalledTimes(
      1,
    );
    expect(openshiftClient.fetchNamespaceRoutes).toHaveBeenCalledTimes(1);
    expect(openshiftClient.fetchNamespacePods).toHaveBeenCalledTimes(1);
    expect(openshiftClient.fetchNamespaceServices).toHaveBeenCalledTimes(1);
  });
});
