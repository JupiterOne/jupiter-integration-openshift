import {
  SERVICE_ENTITY_CLASS,
  SERVICE_ENTITY_TYPE,
  ServiceEntity,
} from "../../jupiterone";
import { NamespaceData } from "../../openshift/types";
import { generateEntityKey } from "../../utils/generateKeys";

export function createServiceEntities(
  namespaces: NamespaceData[],
): ServiceEntity[] {
  const defaultEntities: ServiceEntity[] = [];

  return namespaces.reduce((namespaceSAEntities, namespace) => {
    const srvEntities = namespace.services.reduce((srvs, srv) => {
      const srvEntity: ServiceEntity = {
        _class: SERVICE_ENTITY_CLASS,
        _key: generateEntityKey(SERVICE_ENTITY_TYPE, srv.metadata.uid),
        _type: SERVICE_ENTITY_TYPE,
        displayName: srv.metadata.name,
        uid: srv.metadata.uid,
        namespace: srv.metadata.namespace,
        resourceVersion: srv.metadata.resourceVersion,
        creationTimestamp: srv.metadata.creationTimestamp,
        name: srv.metadata.name,
        clusterIP: srv.spec.clusterIP,
        type: srv.spec.type,
      };

      return [...srvs, srvEntity];
    }, defaultEntities);

    return [...namespaceSAEntities, ...srvEntities];
  }, defaultEntities);
}
