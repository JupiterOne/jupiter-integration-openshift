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
      _key: generateEntityKey(PROJECT_ENTITY_TYPE, d.metadata.uid),
      _type: PROJECT_ENTITY_TYPE,
      displayName: d.metadata.name,
      uid: d.metadata.uid,
      namespace: d.metadata.namespace,
      generation: d.metadata.generation,
      resourceVersion: d.metadata.resourceVersion,
      creationTimestamp: d.metadata.creationTimestamp,
    };

    return project;
  });
}
