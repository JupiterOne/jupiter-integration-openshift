import { createServiceEntities } from "./ServiceEntityConverter";

test("convert services", async () => {
  const services = [
    {
      metadata: {
        name: "jenkins",
        namespace: "example_namespace",
        selfLink: "/api/v1/namespaces/example_namespace/services/jenkins",
        uid: "c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
        resourceVersion: "3548833689",
        creationTimestamp: "2019-04-18T09:53:06Z",
        labels: {
          app: "jenkins-persistent",
          template: "jenkins-persistent-template",
        },
        annotations: {
          "service.alpha.openshift.io/dependencies":
            '[{"name": "jenkins-jnlp", "namespace": "", "kind": "Service"}]',
          "service.openshift.io/infrastructure": "true",
        },
      },
      spec: {
        ports: [
          {
            name: "web",
            protocol: "TCP",
            port: 80,
            targetPort: 8080,
          },
        ],
        selector: {
          name: "jenkins",
        },
        clusterIP: "172.30.122.71",
        type: "ClusterIP",
        sessionAffinity: "None",
      },
      status: {
        loadBalancer: {},
      },
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

  const entities = createServiceEntities([
    { routes: [], serviceAccounts: [], services, pods: [], project },
  ]);

  expect(entities).toEqual([
    {
      _class: "Task",
      _key: "openshift_service_c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
      _type: "openshift_service",
      clusterIP: "172.30.122.71",
      creationTimestamp: "2019-04-18T09:53:06Z",
      displayName: "jenkins",
      name: "jenkins",
      namespace: "example_namespace",
      resourceVersion: "3548833689",
      type: "ClusterIP",
      uid: "c3ee12dc-61bf-11e9-ad62-0a69cdf75e6f",
    },
  ]);
});
