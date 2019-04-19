import { createProjectEntities } from "./ProjectEntityConverter";

test("convert projects", async () => {
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

  const entities = createProjectEntities(projects);

  expect(entities).toEqual([
    {
      _class: "Project",
      _key: "openshift_project_39537998-5bb8-11e9-8c30-4e620801d617",
      _type: "openshift_project",
      creationTimestamp: "2019-04-10T17:44:00Z",
      displayName: "default",
      resourceVersion: "1284",
      uid: "39537998-5bb8-11e9-8c30-4e620801d617",
    },
  ]);
});
