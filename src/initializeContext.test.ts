import { createTestIntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";
import initializeContext from "./initializeContext";

jest.mock("./openshift");

test("creates openshift client", async () => {
  const options = {
    instance: {
      config: {
        apiToken: "",
        cluster: "",
      },
    },
  };

  const executionContext = createTestIntegrationExecutionContext(options);

  const integrationContext = await initializeContext(executionContext);
  expect(integrationContext.graph).toBeDefined();
  expect(integrationContext.persister).toBeDefined();
  expect(integrationContext.openshift).toBeDefined();
});
