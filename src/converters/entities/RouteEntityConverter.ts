import {
  ROUTE_ENTITY_CLASS,
  ROUTE_ENTITY_TYPE,
  RouteEntity,
} from "../../jupiterone";
import { NamespaceData } from "../../openshift/types";
import { generateEntityKey } from "../../utils/generateKeys";

export function createRouteEntities(
  namespaces: NamespaceData[],
): RouteEntity[] {
  const defaultEntities: RouteEntity[] = [];

  return namespaces.reduce((namespaceRouteEntities, namespace) => {
    const routeEntities = namespace.routes.reduce((routes, route) => {
      const routeEntity: RouteEntity = {
        _class: ROUTE_ENTITY_CLASS,
        _key: generateEntityKey(ROUTE_ENTITY_TYPE, route.metadata.uid),
        _type: ROUTE_ENTITY_TYPE,
        displayName: route.metadata.name,
        uid: route.metadata.uid,
        namespace: route.metadata.namespace,
        resourceVersion: route.metadata.resourceVersion,
        creationTimestamp: route.metadata.creationTimestamp,
        name: route.metadata.name,
        host: route.spec.host,
      };

      return [...routes, routeEntity];
    }, defaultEntities);

    return [...namespaceRouteEntities, ...routeEntities];
  }, defaultEntities);
}
