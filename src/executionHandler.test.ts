import {
  IntegrationActionName,
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
  JobsClient,
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
  jobs: {
    logEvent: jest.fn().mockReturnValue({}),
    getLastCompleted: jest.fn().mockReturnValue({}),
  } as JobsClient,
};

let openshiftClient: OpenShiftClient;
let executionContext: IntegrationExecutionContext<IntegrationInvocationEvent>;

jest.mock("./initializeContext");

beforeEach(() => {
  openshiftClient = ({
    authenticate: jest.fn().mockReturnValue([]),
    fetchGroups: jest.fn().mockReturnValue([]),
    fetchProjects: jest.fn().mockReturnValue([]),
    fetchUsers: jest.fn().mockReturnValue([]),
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
  } as unknown) as IntegrationExecutionContext<IntegrationInvocationEvent>;

  (initializeContext as jest.Mock).mockReturnValue(executionContext);
});

describe("INGEST", () => {
  test("all openshift data", async () => {
    (openshiftClient.fetchProjects as jest.Mock).mockResolvedValue([]);

    await executionHandler(executionContext);

    expect(openshiftClient.fetchGroups).toHaveBeenCalledTimes(1);
    expect(openshiftClient.fetchProjects).toHaveBeenCalledTimes(1);
    expect(openshiftClient.fetchUsers).toHaveBeenCalledTimes(1);
  });
});
