import {
  SERVICE_ACCOUNT_ENTITY_CLASS,
  SERVICE_ACCOUNT_ENTITY_TYPE,
  ServiceAccountEntity,
} from "../../jupiterone";
import { NamespaceData } from "../../openshift/types";
import { generateEntityKey } from "../../utils/generateKeys";
import getTime from "../../utils/getTime";

export function createServiceAccountEntities(
  namespaces: NamespaceData[],
): ServiceAccountEntity[] {
  const defaultEntities: ServiceAccountEntity[] = [];

  return namespaces.reduce((namespaceSAEntities, namespace) => {
    const srvAccEntities = namespace.serviceAccounts.reduce(
      (srvAccs, srvAcc) => {
        const srvAccEntity: ServiceAccountEntity = {
          _class: SERVICE_ACCOUNT_ENTITY_CLASS,
          _key: generateEntityKey(
            SERVICE_ACCOUNT_ENTITY_TYPE,
            srvAcc.metadata.uid,
          ),
          _type: SERVICE_ACCOUNT_ENTITY_TYPE,
          displayName: srvAcc.metadata.name,
          uid: srvAcc.metadata.uid,
          namespace: srvAcc.metadata.namespace,
          resourceVersion: srvAcc.metadata.resourceVersion,
          creationTimestamp: getTime(srvAcc.metadata.creationTimestamp)!,
          name: srvAcc.metadata.name,
        };

        return [...srvAccs, srvAccEntity];
      },
      defaultEntities,
    );

    return [...namespaceSAEntities, ...srvAccEntities];
  }, defaultEntities);
}
