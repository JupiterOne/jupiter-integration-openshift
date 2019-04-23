import { createAccountGroupRelationships } from "./AccountGroupRelationshipConverter";

test("convert account -> group relationships", async () => {
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

  const account = {
    _class: "Account",
    _key: "openshift_account_id",
    _type: "openshift_account",
    cluster: "example.com",
    displayName: "name",
  };
  const relationships = createAccountGroupRelationships(groups, account);

  expect(relationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "openshift_account_id",
      _key:
        "openshift_account_id_has_openshift_user_group_259b87ab-5c46-11e9-82b7-4e620801d617",
      _toEntityKey: "openshift_user_group_259b87ab-5c46-11e9-82b7-4e620801d617",
      _type: "openshift_account_has_group",
    },
    {
      _class: "HAS",
      _fromEntityKey: "openshift_account_id",
      _key:
        "openshift_account_id_has_openshift_user_group_2aafc5a6-5c46-11e9-82b7-4e620801d617",
      _toEntityKey: "openshift_user_group_2aafc5a6-5c46-11e9-82b7-4e620801d617",
      _type: "openshift_account_has_group",
    },
  ]);
});
