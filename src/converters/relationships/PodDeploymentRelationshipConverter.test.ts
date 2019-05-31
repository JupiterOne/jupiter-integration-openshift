import { readFileSync } from "fs";
import { NamespaceData } from "../../openshift/types";
import { createPodDeploymentRelationships } from "./PodDeploymentRelationshipConverter";

test("convert namespace relationships", async () => {
  const file = readFileSync(
    `${__dirname}/../../../test/fixtures/namespace-objects.json`,
  );
  const namespace = JSON.parse(file.toString()) as NamespaceData;
  const namespaces = [namespace];

  const relationships = createPodDeploymentRelationships(namespaces);

  expect(relationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_pod_c764e7d4-61bf-11e9-b220-0a2a2b777307",
      _key:
        "openshift_pod_c764e7d4-61bf-11e9-b220-0a2a2b777307_has_openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _toEntityKey: "openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_pod_has_deployment",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000",
      _key:
        "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000_has_openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _toEntityKey: "openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_pod_has_deployment",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000",
      _key:
        "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000_has_openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _toEntityKey: "openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_pod_has_deployment",
    },
  ]);
});
