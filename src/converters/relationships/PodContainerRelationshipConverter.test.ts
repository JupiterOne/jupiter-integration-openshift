import { readFileSync } from "fs";
import { NamespaceData } from "../../openshift/types";
import { createPodContainerRelationships } from "./PodContainerRelationshipConverter";

test("convert namespace relationships", async () => {
  const file = readFileSync(
    `${__dirname}/../../../test/fixtures/namespace-objects.json`,
  );
  const namespace = JSON.parse(file.toString()) as NamespaceData;
  const namespaces = [namespace];

  const relationships = createPodContainerRelationships(namespaces);

  expect(relationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_pod_c764e7d4-61bf-11e9-b220-0a2a2b777307",
      _key:
        "openshift_pod_c764e7d4-61bf-11e9-b220-0a2a2b777307_has_openshift_container_c764e7d4-61bf-11e9-b220-0a2a2b777307_jenkins",
      _toEntityKey:
        "openshift_container_c764e7d4-61bf-11e9-b220-0a2a2b777307_jenkins",
      _type: "openshift_pod_has_container",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000",
      _key:
        "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000_has_openshift_container_c3ee12dc-61bf-11e9-ad62-000000000000_rails",
      _toEntityKey:
        "openshift_container_c3ee12dc-61bf-11e9-ad62-000000000000_rails",
      _type: "openshift_pod_has_container",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000",
      _key:
        "openshift_pod_c3ee12dc-61bf-11e9-ad62-000000000000_has_openshift_container_c3ee12dc-61bf-11e9-ad62-000000000000_test",
      _toEntityKey:
        "openshift_container_c3ee12dc-61bf-11e9-ad62-000000000000_test",
      _type: "openshift_pod_has_container",
    },
  ]);
});
