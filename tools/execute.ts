/* tslint:disable:no-console */
import { executeIntegrationLocal } from "@jupiterone/jupiter-managed-integration-sdk";

import invocationConfig from "../src/index";

const integrationConfig = {
  cluster: process.env.OPENSHIFT_LOCAL_EXECUTION_CLUSTER,
  apiToken: process.env.OPENSHIFT_LOCAL_EXECUTION_API_TOKEN,
};

executeIntegrationLocal(integrationConfig, invocationConfig, {}).catch(err => {
  console.error(err);
  process.exit(1);
});
