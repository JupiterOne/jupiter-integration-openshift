import {
  GROUP_ENTITY_CLASS,
  GROUP_ENTITY_TYPE,
  GroupEntity,
} from "../../jupiterone";

import { Group } from "../../openshift/types";

import { generateEntityKey } from "../../utils/generateKeys";
import getTime from "../../utils/getTime";

export function createGroupEntities(data: Group[]): GroupEntity[] {
  return data.map(d => {
    const group: GroupEntity = {
      _class: GROUP_ENTITY_CLASS,
      _key: generateEntityKey(GROUP_ENTITY_TYPE, d.metadata.uid),
      _type: GROUP_ENTITY_TYPE,
      displayName: d.metadata.name,
      uid: d.metadata.uid,
      namespace: d.metadata.namespace,
      generation: d.metadata.generation,
      resourceVersion: d.metadata.resourceVersion,
      createdOn: getTime(d.metadata.creationTimestamp)!,
    };
    return group;
  });
}
