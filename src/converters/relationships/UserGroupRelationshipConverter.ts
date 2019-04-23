import { Group, User } from "../../openshift/types";

import {
  GROUP_ENTITY_TYPE,
  USER_ENTITY_TYPE,
  USER_GROUP_RELATIONSHIP_CLASS,
  USER_GROUP_RELATIONSHIP_TYPE,
  UserGroupRelationship,
} from "../../jupiterone";

import {
  generateEntityKey,
  generateRelationshipKey,
} from "../../utils/generateKeys";

interface UserDict {
  [uid: string]: User;
}

export function createUserGroupRelationships(
  groups: Group[],
  users: User[],
): UserGroupRelationship[] {
  const usersDict: UserDict = users.reduce((dict, user) => {
    return { ...dict, [user.metadata.name]: user };
  }, {});

  return groups.reduce(
    (relationships, group) => {
      const groupUsers = group.users.reduce(
        (groupUsersRelationships, userName) => {
          const parentKey = generateEntityKey(
            USER_ENTITY_TYPE,
            usersDict[userName].metadata.uid,
          );
          const childKey = generateEntityKey(
            GROUP_ENTITY_TYPE,
            group.metadata.uid,
          );
          const key = generateRelationshipKey(
            parentKey,
            childKey,
            USER_GROUP_RELATIONSHIP_CLASS,
          );

          const relationship: UserGroupRelationship = {
            _class: USER_GROUP_RELATIONSHIP_CLASS,
            _fromEntityKey: parentKey,
            _key: key,
            _type: USER_GROUP_RELATIONSHIP_TYPE,
            _toEntityKey: childKey,
          };

          return [...groupUsersRelationships, relationship];
        },
        [] as UserGroupRelationship[],
      );

      return [...relationships, ...groupUsers];
    },
    [] as UserGroupRelationship[],
  );
}
