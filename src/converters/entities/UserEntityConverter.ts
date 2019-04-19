import { USER_ENTITY_CLASS, USER_ENTITY_TYPE, UserEntity } from "../../jupiterone";
import { User } from "../../openshift/types";

import { generateEntityKey } from "../../utils/generateKeys";

export function createUserEntities(data: User[]): UserEntity[] {
  return data.map(u => {
    const user: UserEntity = {
      _class: USER_ENTITY_CLASS,
      _key: generateEntityKey(USER_ENTITY_TYPE, u.metadata.uid),
      _type: USER_ENTITY_TYPE,
      displayName: u.metadata.name,
      uid: u.metadata.uid,
      fullName: u.fullName || "",
      generation: u.metadata.generation,
      resourceVersion: u.metadata.resourceVersion,
      creationTimestamp: u.metadata.creationTimestamp,
    };

    return user;
  });
}
