import { readFileSync } from "fs";
import { NamespaceData } from "../../openshift/types";
import { createServicePodRelationships } from "./ServicePodRelationshipConverter";

test("convert namespace relationships", async () => {
  const file = readFileSync(`${__dirname}/../../../test/fixtures/namespace-objects.json`);
  const namespace = JSON.parse(file.toString()) as NamespaceData;
  const namespaces = [namespace];

  const relationships = createServicePodRelationships(namespaces);

  expect(relationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _key: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f_has_openshift_pod_c764e7d4-61bf-11e9-b220-0a2a2b777307",
      _toEntityKey: "openshift_pod_c764e7d4-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_service_has_pod",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _key: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f_has_openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000",
      _toEntityKey: "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000",
      _type: "openshift_service_has_pod",
    },
  ]);
});
