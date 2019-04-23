import { readFileSync } from "fs";
import {
  PROJECT_ROUTE_RELATIONSHIP_CLASS,
  PROJECT_ROUTE_RELATIONSHIP_TYPE,
  PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_CLASS,
  PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_TYPE,
  PROJECT_SERVICE_RELATIONSHIP_CLASS,
  PROJECT_SERVICE_RELATIONSHIP_TYPE,
  ROUTE_ENTITY_TYPE,
  SERVICE_ACCOUNT_ENTITY_TYPE,
  SERVICE_ENTITY_TYPE,
} from "../../jupiterone";
import { NamespaceData } from "../../openshift/types";
import { createNamespaceRelationships } from "./NamespaceRelationshipsConverter";

test("convert namespace relationships", async () => {
  const file = readFileSync(
    `${__dirname}/../../../test/fixtures/namespace-objects.json`,
  );
  const namespace = JSON.parse(file.toString()) as NamespaceData;
  const namespaces = [namespace];

  const routes = createNamespaceRelationships(
    namespaces,
    "routes",
    ROUTE_ENTITY_TYPE,
    PROJECT_ROUTE_RELATIONSHIP_TYPE,
    PROJECT_ROUTE_RELATIONSHIP_CLASS,
  );

  const services = createNamespaceRelationships(
    namespaces,
    "services",
    SERVICE_ENTITY_TYPE,
    PROJECT_SERVICE_RELATIONSHIP_TYPE,
    PROJECT_SERVICE_RELATIONSHIP_CLASS,
  );

  const serviceAccounts = createNamespaceRelationships(
    namespaces,
    "serviceAccounts",
    SERVICE_ACCOUNT_ENTITY_TYPE,
    PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_TYPE,
    PROJECT_SERVICE_ACCOUNT_RELATIONSHIP_CLASS,
  );

  expect(routes).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _toEntityKey: "openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _type: "openshift_project_has_route",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _toEntityKey: "openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _type: "openshift_project_has_route",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _toEntityKey: "openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _type: "openshift_project_has_route",
    },
  ]);
  expect(services).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _toEntityKey: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _type: "openshift_project_has_service",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _toEntityKey: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _type: "openshift_project_has_service",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _toEntityKey: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _type: "openshift_project_has_service",
    },
  ]);
  expect(serviceAccounts).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _key:
        "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617_has_openshift_service_account_c077817b-61bf-11e9-b220-0a2a2b777307",
      _toEntityKey:
        "openshift_service_account_c077817b-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_project_has_service_account",
    },
  ]);
});
