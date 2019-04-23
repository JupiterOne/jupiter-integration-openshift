import { NamespaceData, Pod } from "../../openshift/types";

import {
  POD_CONTAINER_RELATIONSHIP_CLASS,
  POD_CONTAINER_RELATIONSHIP_TYPE,
  POD_ENTITY_TYPE,
  PodContainerRelationship,
} from "../../jupiterone";

import {
  generateEntityKey,
  generateRelationshipKey,
} from "../../utils/generateKeys";
import { generateContainerKey } from "../entities/ContainerEntityConverter";

export function createPodContainerRelationships(
  namespaces: NamespaceData[],
): PodContainerRelationship[] {
  const defaultRelationships: PodContainerRelationship[] = [];

  return namespaces.reduce((relationships, namespace) => {
    return [...relationships, ...createNsPodContainerRelationships(namespace)];
  }, defaultRelationships);
}

function createNsPodContainerRelationships(
  namespace: NamespaceData,
): PodContainerRelationship[] {
  const defaultRelationships: PodContainerRelationship[] = [];

  return namespace.pods.reduce((relationships, pod) => {
    return [...relationships, ...createPodRelationships(pod)];
  }, defaultRelationships);
}

function createPodRelationships(pod: Pod): PodContainerRelationship[] {
  return pod.spec.containers.map(container => {
    const parentKey = generateEntityKey(POD_ENTITY_TYPE, pod.metadata.uid);
    const childKey = generateContainerKey(pod, container);
    const relationshipKey = generateRelationshipKey(
      parentKey,
      childKey,
      POD_CONTAINER_RELATIONSHIP_CLASS,
    );

    const relationship: PodContainerRelationship = {
      _class: POD_CONTAINER_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: relationshipKey,
      _type: POD_CONTAINER_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return relationship;
  });
}
