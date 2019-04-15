import { createUserGroupRelationships } from "./UserGroupRelationshipConverter";

test("convert user group relationships", async () => {
  const users = [
    {
      metadata: {
        name: "test-user",
        selfLink: "/apis/user.openshift.io/v1/users/test-user",
        uid: "eabd5afd-5c45-11e9-82b7-4e620801d617",
        resourceVersion: "47231",
        creationTimestamp: "2019-04-11T10:38:17Z",
      },
      fullName: "User Test",
      identities: null,
      groups: null,
    },
    {
      metadata: {
        name: "test-user-1",
        selfLink: "/apis/user.openshift.io/v1/users/test-user-1",
        uid: "eabd5afd-5c45-11e9-82b7-4e620801dd17",
        resourceVersion: "47231",
        creationTimestamp: "2019-04-11T10:38:17Z",
      },
      fullName: "User Test 1",
      identities: null,
      groups: null,
    },
  ];

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
        name: "first-group",
        selfLink: "/apis/user.openshift.io/v1/groups/first-group",
        uid: "259b87ab-5c46-11e9-82b7-4e620801d6d7",
        resourceVersion: "34739",
        creationTimestamp: "2019-04-11T10:39:55Z",
      },
      users: [],
    },
  ];

  const relationshipss = createUserGroupRelationships(groups, users);

  expect(relationshipss).toEqual([
    {
      _class: "ASSIGNED",
      _fromEntityKey: "openshift_user_eabd5afd-5c45-11e9-82b7-4e620801d617",
      _key:
        "openshift_user_eabd5afd-5c45-11e9-82b7-4e620801d617_assigned_openshift_user_group_259b87ab-5c46-11e9-82b7-4e620801d617",
      _toEntityKey: "openshift_user_group_259b87ab-5c46-11e9-82b7-4e620801d617",
      _type: "openshift_user_assigned_group",
    },
  ]);
});
