import { createGroupEntities } from "./GroupEntityConverter";

test("convert groups", async () => {
  const groups = [
    {
      metadata: {
        name: "first-group",
        selfLink: "/apis/user.openshift.io/v1/groups/first-group",
        uid: "259b87ab-5c46-11e9-82b7-4e620801d617",
        resourceVersion: "34739",
        creationTimestamp: "2019-04-11T10:39:55Z",
      },
      users: ["test-user"],
    },
    {
      metadata: {
        name: "second-group",
        selfLink: "/apis/user.openshift.io/v1/groups/second-group",
        uid: "2aafc5a6-5c46-11e9-82b7-4e620801d617",
        resourceVersion: "34775",
        creationTimestamp: "2019-04-11T10:40:04Z",
      },
      users: ["second-test-user"],
    },
  ];

  const entities = createGroupEntities(groups);

  expect(entities).toEqual([
    {
      _class: "UserGroup",
      _key: "openshift_user_group_259b87ab-5c46-11e9-82b7-4e620801d617",
      _type: "openshift_user_group",
      createdOn: 1554979195000,
      displayName: "first-group",
      resourceVersion: "34739",
      uid: "259b87ab-5c46-11e9-82b7-4e620801d617",
    },
    {
      _class: "UserGroup",
      _key: "openshift_user_group_2aafc5a6-5c46-11e9-82b7-4e620801d617",
      _type: "openshift_user_group",
      createdOn: 1554979204000,
      displayName: "second-group",
      resourceVersion: "34775",
      uid: "2aafc5a6-5c46-11e9-82b7-4e620801d617",
    },
  ]);
});
