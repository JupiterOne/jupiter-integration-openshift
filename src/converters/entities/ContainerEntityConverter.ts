import { CONTAINER_ENTITY_CLASS, CONTAINER_ENTITY_TYPE, ContainerEntity } from "../../jupiterone";
import { Container, NamespaceData, Pod } from "../../openshift/types";
import { generateEntityKey } from "../../utils/generateKeys";

export function createContainerEntities(namespaces: NamespaceData[]): ContainerEntity[] {
  const defaultEntities: ContainerEntity[] = [];

  return namespaces.reduce((namespaceContainerEntities, namespace) => {
    const podEntities = namespace.pods.reduce((pods, pod) => {
      const containerEntities: ContainerEntity[] = pod.spec.containers.map(container => {
        const containerEntity: ContainerEntity = {
          _class: CONTAINER_ENTITY_CLASS,
          _key: generateContainerKey(pod, container),
          _type: CONTAINER_ENTITY_TYPE,
          displayName: container.name,
          name: container.name,
          image: container.image,
        };
        return containerEntity;
      });

      return [...pods, ...containerEntities];
    }, defaultEntities);

    return [...namespaceContainerEntities, ...podEntities];
  }, defaultEntities);
}

export function generateContainerKey(pod: Pod, container: Container): string {
  const uniqId = `${pod.metadata.uid}_${container.name}`;
  return generateEntityKey(CONTAINER_ENTITY_TYPE, uniqId);
}
