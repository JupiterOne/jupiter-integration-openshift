import { Project } from "../openshift/types";

import {
  ACCOUNT_PROJECT_RELATIONSHIP_CLASS,
  ACCOUNT_PROJECT_RELATIONSHIP_TYPE,
  AccountEntity,
  AccountProjectRelationship,
  PROJECT_ENTITY_TYPE,
} from "../jupiterone";

import {
  generateEntityKey,
  generateRelationshipKey,
} from "../utils/generateKeys";

export function createAccountProjectRelationships(
  projects: Project[],
  account: AccountEntity,
) {
  const defaultValue: AccountProjectRelationship[] = [];

  return projects.reduce((acc, project) => {
    const parentKey = account._key;
    const childKey = generateEntityKey(
      PROJECT_ENTITY_TYPE,
      project.metadata.uid,
    );
    const key = generateRelationshipKey(
      parentKey,
      childKey,
      ACCOUNT_PROJECT_RELATIONSHIP_CLASS,
    );

    const relationship: AccountProjectRelationship = {
      _class: ACCOUNT_PROJECT_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: key,
      _type: ACCOUNT_PROJECT_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return [...acc, relationship];
  }, defaultValue);
}
