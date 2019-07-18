import { NamespaceData, Pod, Service } from "../../openshift/types";

import {
  POD_ENTITY_TYPE,
  SERVICE_ENTITY_TYPE,
  SERVICE_POD_RELATIONSHIP_CLASS,
  SERVICE_POD_RELATIONSHIP_TYPE,
  ServicePodRelationship,
} from "../../jupiterone";

import {
  generateEntityKey,
  generateRelationshipKey,
} from "../../utils/generateKeys";

interface PodDict {
  [name: string]: Pod[];
}

export function createServicePodRelationships(
  namespaces: NamespaceData[],
): ServicePodRelationship[] {
  const podsDict: PodDict = populatePodsDict(namespaces);
  const defaultRelationships: ServicePodRelationship[] = [];

  return namespaces.reduce((relationships, namespace) => {
    return [
      ...relationships,
      ...createNsServicePodRelationships(namespace, podsDict),
    ];
  }, defaultRelationships);
}

function createNsServicePodRelationships(
  namespace: NamespaceData,
  podsDict: PodDict,
): ServicePodRelationship[] {
  const defaultRelationships: ServicePodRelationship[] = [];

  return namespace.services.reduce((relationships, service) => {
    if (!service.spec.selector || !service.spec.selector.name) {
      return relationships;
    }

    const key = `${namespace.project.metadata.name}_${
      service.spec.selector.name
    }`;
    const pods = podsDict[key];

    if (!pods) {
      return relationships;
    }

    const podRelshps = pods.map(pod => {
      return createRelationship(pod, service);
    });

    return [...relationships, ...podRelshps];
  }, defaultRelationships);
}

function createRelationship(
  pod: Pod,
  service: Service,
): ServicePodRelationship {
  const parentKey = generateEntityKey(
    SERVICE_ENTITY_TYPE,
    service.metadata.uid,
  );
  const childKey = generateEntityKey(POD_ENTITY_TYPE, pod.metadata.uid);
  const relationshipKey = generateRelationshipKey(
    parentKey,
    childKey,
    SERVICE_POD_RELATIONSHIP_CLASS,
  );

  const relationship: ServicePodRelationship = {
    _class: SERVICE_POD_RELATIONSHIP_CLASS,
    _fromEntityKey: parentKey,
    _key: relationshipKey,
    _type: SERVICE_POD_RELATIONSHIP_TYPE,
    _toEntityKey: childKey,
  };

  return relationship;
}

function populatePodsDict(namespaces: NamespaceData[]): PodDict {
  const podsDict: PodDict = {};

  namespaces.forEach(namespace => {
    namespace.pods.forEach(pod => {
      if (!(pod.metadata.labels && pod.metadata.labels.name)) {
        return;
      }
      const key = `${namespace.project.metadata.name}_${
        pod.metadata.labels.name
      }`;

      if (podsDict[key]) {
        podsDict[key] = [...podsDict[key], pod];
      } else {
        podsDict[key] = [pod];
      }
    });
  });

  return podsDict;
}
