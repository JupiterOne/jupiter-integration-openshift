import { POD_ENTITY_CLASS, POD_ENTITY_TYPE, PodEntity } from "../../jupiterone";
import { NamespaceData } from "../../openshift/types";
import { generateEntityKey } from "../../utils/generateKeys";
import getTime from "../../utils/getTime";

export function createPodEntities(namespaces: NamespaceData[]): PodEntity[] {
  const defaultEntities: PodEntity[] = [];

  return namespaces.reduce((namespacePodEntities, namespace) => {
    const podEntities = namespace.pods.reduce((pods, pod) => {
      const podEntity: PodEntity = {
        _class: POD_ENTITY_CLASS,
        _key: generateEntityKey(POD_ENTITY_TYPE, pod.metadata.uid),
        _type: POD_ENTITY_TYPE,
        displayName: pod.metadata.name,
        uid: pod.metadata.uid,
        namespace: pod.metadata.namespace,
        resourceVersion: pod.metadata.resourceVersion,
        createdOn: getTime(pod.metadata.creationTimestamp)!,
        name: pod.metadata.name,
        nodeName: pod.spec.nodeName,
        phase: pod.status.phase,
        hostIP: pod.status.hostIP,
        podIP: pod.status.podIP,
        startTime: getTime(pod.status.startTime)!,
        qosClass: pod.status.qosClass,
      };

      return [...pods, podEntity];
    }, defaultEntities);

    return [...namespacePodEntities, ...podEntities];
  }, defaultEntities);
}
