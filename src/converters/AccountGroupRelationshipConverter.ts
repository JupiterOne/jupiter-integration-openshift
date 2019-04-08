import { Group } from "../openshift/types";

import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_GROUP_RELATIONSHIP_CLASS,
  ACCOUNT_GROUP_RELATIONSHIP_TYPE,
  AccountEntity,
  AccountGroupRelationship,
  GROUP_ENTITY_TYPE,
} from "../jupiterone";

import {
  generateEntityKey,
  generateRelationshipKey,
} from "../utils/generateKeys";

export function createAccountGroupRelationships(
  groups: Group[],
  account: AccountEntity,
) {
  const defaultValue: AccountGroupRelationship[] = [];

  return groups.reduce((acc, group) => {
    const parentKey = generateEntityKey(ACCOUNT_ENTITY_TYPE, account._key);
    const childKey = generateEntityKey(GROUP_ENTITY_TYPE, group.id);
    const key = generateRelationshipKey(
      parentKey,
      childKey,
      ACCOUNT_GROUP_RELATIONSHIP_CLASS,
    );

    const relationship: AccountGroupRelationship = {
      _class: ACCOUNT_GROUP_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: key,
      _type: ACCOUNT_GROUP_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return [...acc, relationship];
  }, defaultValue);
}
