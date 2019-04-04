/* tslint:disable:no-console */
import {
  createLocalInvocationEvent,
  executeSingleHandlerLocal,
} from "@jupiterone/jupiter-managed-integration-sdk/local";
import { createLogger, TRACE } from "bunyan";
import { executionHandler } from "../src/index";

async function run(): Promise<void> {
  const logger = createLogger({ name: "local", level: TRACE });

  const integrationConfig = {
    cluster: process.env.OPENSHIFT_LOCAL_EXECUTION_CLUSTER,
    namespace: process.env.OPENSHIFT_LOCAL_EXECUTION_NAMESPACE,
    user: process.env.OPENSHIFT_LOCAL_EXECUTION_USER,
    apiToken: process.env.OPENSHIFT_LOCAL_EXECUTION_API_TOKEN,
  };

  const invocationArgs = {};

  logger.info(
    await executeSingleHandlerLocal(
      integrationConfig,
      logger,
      executionHandler,
      invocationArgs,
      createLocalInvocationEvent(),
    ),
    "Execution completed successfully!",
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
