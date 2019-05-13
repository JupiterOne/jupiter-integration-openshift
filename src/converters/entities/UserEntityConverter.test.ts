import { createUserEntities } from "./UserEntityConverter";

test("convert users", async () => {
  const users = [
    {
      metadata: {
        name: "developer",
        selfLink: "/apis/user.openshift.io/v1/users/developer",
        uid: "ad550b5e-5bb8-11e9-a9f5-4e620801d617",
        resourceVersion: "2142",
        creationTimestamp: "2019-04-10T17:47:15Z",
      },
      identities: ["anypassword:developer"],
      groups: null,
    },
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
  ];

  const entities = createUserEntities(users);

  expect(entities).toEqual([
    {
      _class: "User",
      _key: "openshift_user_ad550b5e-5bb8-11e9-a9f5-4e620801d617",
      _type: "openshift_user",
      creationTimestamp: 1554918435000,
      displayName: "developer",
      fullName: "",
      resourceVersion: "2142",
      uid: "ad550b5e-5bb8-11e9-a9f5-4e620801d617",
    },
    {
      _class: "User",
      _key: "openshift_user_eabd5afd-5c45-11e9-82b7-4e620801d617",
      _type: "openshift_user",
      creationTimestamp: 1554979097000,
      displayName: "test-user",
      fullName: "User Test",
      resourceVersion: "47231",
      uid: "eabd5afd-5c45-11e9-82b7-4e620801d617",
    },
  ]);
});
