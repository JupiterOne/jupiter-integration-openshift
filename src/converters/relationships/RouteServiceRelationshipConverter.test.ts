import { readFileSync } from "fs";
import { NamespaceData } from "../../openshift/types";
import { createRouteServiceRelationships } from "./RouteServiceRelationshipConverter";

test("convert namespace relationships", async () => {
  const file = readFileSync(`${__dirname}/../../../test/fixtures/namespace-objects.json`);
  const namespace = JSON.parse(file.toString()) as NamespaceData;
  const namespaces = [namespace];

  const relationships = createRouteServiceRelationships(namespaces);

  expect(relationships).toEqual([
    {
      _class: "EXTENDS",
      _toEntityKey: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _key: "openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3_extends_openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _fromEntityKey: "openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _type: "openshift_route_extends_service",
    },
  ]);
});
