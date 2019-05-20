import {
  DEPLOYMENT_ENTITY_CLASS,
  DEPLOYMENT_ENTITY_TYPE,
  DeploymentEntity,
} from "../../jupiterone";
import { NamespaceData } from "../../openshift/types";
import { generateEntityKey } from "../../utils/generateKeys";
import getTime from "../../utils/getTime";

export function createDeploymentEntities(
  namespaces: NamespaceData[],
): DeploymentEntity[] {
  const defaultEntities: DeploymentEntity[] = [];

  return namespaces.reduce((acc, namespace) => {
    const entities = namespace.deployments.reduce((deployments, item) => {
      const entity: DeploymentEntity = {
        _class: DEPLOYMENT_ENTITY_CLASS,
        _key: generateEntityKey(DEPLOYMENT_ENTITY_TYPE, item.metadata.uid),
        _type: DEPLOYMENT_ENTITY_TYPE,
        displayName: item.metadata.name,
        name: item.metadata.name,
        isActive: item.status.replicas > 0,
        createdOn: getTime(item.metadata.creationTimestamp)!,
      };

      return [...deployments, entity];
    }, defaultEntities);

    return [...acc, ...entities];
  }, defaultEntities);
}
