import { DEPLOYMENT_ENTITY_TYPE, POD_ENTITY_TYPE } from "../../jupiterone";
import {
  POD_DEPLOYMENT_RELATIONSHIP_CLASS,
  POD_DEPLOYMENT_RELATIONSHIP_TYPE,
  PodDeploymentRelationship,
} from "../../jupiterone/relationships";
import { NamespaceData, Pod } from "../../openshift/types";

import {
  generateEntityKey,
  generateRelationshipKey,
} from "../../utils/generateKeys";

export function createPodDeploymentRelationships(
  namespaces: NamespaceData[],
): PodDeploymentRelationship[] {
  const defaultRelationships: PodDeploymentRelationship[] = [];

  return namespaces.reduce((relationships, namespace) => {
    return [...relationships, ...createNsPodDeploymentRelationships(namespace)];
  }, defaultRelationships);
}

function createNsPodDeploymentRelationships(
  namespace: NamespaceData,
): PodDeploymentRelationship[] {
  const defaultRelationships: PodDeploymentRelationship[] = [];

  return namespace.pods.reduce((relationships, pod) => {
    return [...relationships, ...createPodRelationships(pod)];
  }, defaultRelationships);
}

function createPodRelationships(pod: Pod): PodDeploymentRelationship[] {
  if (!pod.metadata.ownerReferences) {
    return [];
  }
  return pod.metadata.ownerReferences.map(deployment => {
    const parentKey = generateEntityKey(POD_ENTITY_TYPE, pod.metadata.uid);
    const childKey = generateEntityKey(DEPLOYMENT_ENTITY_TYPE, deployment.uid);
    const relationshipKey = generateRelationshipKey(
      parentKey,
      childKey,
      POD_DEPLOYMENT_RELATIONSHIP_CLASS,
    );

    const relationship: PodDeploymentRelationship = {
      _class: POD_DEPLOYMENT_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: relationshipKey,
      _type: POD_DEPLOYMENT_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return relationship;
  });
}
