import { createServiceAccountEntities } from "./ServiceAccountEntityConverter";

test("convert service accounts", async () => {
  const serviceAccounts = [
    {
      metadata: {
        name: "builder",
        namespace: "example_namespace",
        selfLink:
          "/api/v1/namespaces/example_namespace/serviceaccounts/builder",
        uid: "c077817b-61bf-11e9-b220-0a2a2b777307",
        resourceVersion: "3548833510",
        creationTimestamp: "2019-04-18T09:53:00Z",
      },
      secrets: [
        {
          name: "builder-token-xpqbv",
        },
        {
          name: "builder-dockercfg-5wqq7",
        },
      ],
      imagePullSecrets: [
        {
          name: "builder-dockercfg-5wqq7",
        },
      ],
    },
  ];

  const project = {
    metadata: {
      name: "default",
      selfLink: "/apis/project.openshift.io/v1/projects/default",
      uid: "39537998-5bb8-11e9-8c30-4e620801d617",
      resourceVersion: "1284",
      creationTimestamp: "2019-04-10T17:44:00Z",
      annotations: {},
    },
    spec: {
      finalizers: ["kubernetes"],
    },
    status: {
      phase: "Active",
    },
  };

  const entities = createServiceAccountEntities([
    {
      routes: [],
      serviceAccounts,
      services: [],
      pods: [],
      project,
      deployments: [],
    },
  ]);

  expect(entities).toEqual([
    {
      _class: "User",
      _key: "openshift_service_account_c077817b-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_service_account",
      createdOn: 1555581180000,
      displayName: "builder",
      name: "builder",
      namespace: "example_namespace",
      resourceVersion: "3548833510",
      uid: "c077817b-61bf-11e9-b220-0a2a2b777307",
    },
  ]);
});
