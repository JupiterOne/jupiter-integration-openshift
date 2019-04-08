import {
  PROJECT_ENTITY_CLASS,
  PROJECT_ENTITY_TYPE,
  ProjectEntity,
} from "../jupiterone";
import { Project } from "../openshift/types";

import { generateEntityKey } from "../utils/generateKeys";

export function createProjectEntities(data: Project[]): ProjectEntity[] {
  return data.map(d => {
    const project: ProjectEntity = {
      _class: PROJECT_ENTITY_CLASS,
      _key: generateEntityKey(PROJECT_ENTITY_TYPE, d.uid),
      _type: PROJECT_ENTITY_TYPE,
      displayName: `${d.firstName} ${d.lastName}`,
      uid: d.uid,
    };
    return project;
  });
}
