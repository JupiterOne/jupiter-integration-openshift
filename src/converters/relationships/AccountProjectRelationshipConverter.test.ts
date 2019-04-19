import { createAccountProjectRelationships } from "./AccountProjectRelationshipConverter";

test("convert account -> project relationships", async () => {
  const projects = [
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
  ];

  const account = {
    _class: "Account",
    _key: "openshift_account_id",
    _type: "openshift_account",
    cluster: "example.com",
    displayName: "name",
  };
  const relationships = createAccountProjectRelationships(projects, account);

  expect(relationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_account_id",
      _key: "openshift_account_id_has_openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _toEntityKey: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _type: "openshift_account_has_project",
    },
  ]);
});
