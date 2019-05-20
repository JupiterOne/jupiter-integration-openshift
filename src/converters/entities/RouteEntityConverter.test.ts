import { createRouteEntities } from "./RouteEntityConverter";

test("convert routes", async () => {
  const routes = [
    {
      metadata: {
        name: "jenkins",
        namespace: "example_namespace",
        selfLink:
          "/apis/route.openshift.io/v1/namespaces/example_namespace/routes/jenkins",
        uid: "c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
        resourceVersion: "3548833669",
        creationTimestamp: "2019-04-18T09:53:06Z",
        labels: {
          app: "jenkins-persistent",
          template: "jenkins-persistent-template",
        },
        annotations: {
          "haproxy.router.openshift.io/timeout": "4m",
          "openshift.io/host.generated": "true",
          "template.openshift.io/expose-uri": "http://{.spec.host}{.spec.path}",
        },
      },
      spec: {
        host:
          "jenkins-example_namespace.7e14.starter-us-west-2.openshiftapps.com",
        to: {
          kind: "Service",
          name: "jenkins",
          weight: 100,
        },
        tls: {
          termination: "edge",
          insecureEdgeTerminationPolicy: "Redirect",
        },
        wildcardPolicy: "None",
      },
      status: {
        ingress: [
          {
            host:
              "jenkins-example_namespace.7e14.starter-us-west-2.openshiftapps.com",
            routerName: "router",
            conditions: [
              {
                type: "Admitted",
                status: "True",
                lastTransitionTime: "2019-04-18T09:53:06Z",
              },
            ],
            wildcardPolicy: "None",
            routerCanonicalHostname:
              "elb.7e14.starter-us-west-2.openshiftapps.com",
          },
        ],
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

  const entities = createRouteEntities([
    {
      routes,
      serviceAccounts: [],
      services: [],
      pods: [],
      project,
      deployments: [],
    },
  ]);

  expect(entities).toEqual([
    {
      _class: "Domain",
      _key: "openshift_route_c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
      _type: "openshift_route",
      createdOn: 1555581186000,
      displayName: "jenkins",
      host:
        "jenkins-example_namespace.7e14.starter-us-west-2.openshiftapps.com",
      name: "jenkins",
      namespace: "example_namespace",
      resourceVersion: "3548833669",
      uid: "c3cd6d2e-61bf-11e9-9c2a-0ab8769191d3",
    },
  ]);
});
