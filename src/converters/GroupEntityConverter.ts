import {
  GROUP_ENTITY_CLASS,
  GROUP_ENTITY_TYPE,
  GroupEntity,
} from "../jupiterone";

import { Group } from "../openshift/types";

import { generateEntityKey } from "../utils/generateKeys";

export function createGroupEntities(data: Group[]): GroupEntity[] {
  return data.map(d => {
    const group: GroupEntity = {
      _class: GROUP_ENTITY_CLASS,
      _key: generateEntityKey(GROUP_ENTITY_TYPE, d.id),
      _type: GROUP_ENTITY_TYPE,
      displayName: d.manufacturer,
      uid: d.uid,
      namespace: d.namespace,
      generation: d.generation,
      resourceVersion: d.resourceVersion,
    };
    return group;
  });
}
