import { NamespaceData, Route, Service } from "../../openshift/types";

import {
  ROUTE_ENTITY_TYPE,
  ROUTE_SERVICE_RELATIONSHIP_CLASS,
  ROUTE_SERVICE_RELATIONSHIP_TYPE,
  RouteServiceRelationship,
  SERVICE_ENTITY_TYPE,
} from "../../jupiterone";

import { generateEntityKey, generateRelationshipKey } from "../../utils/generateKeys";

export function createRouteServiceRelationships(namespaces: NamespaceData[]): RouteServiceRelationship[] {
  const defaultRelationships: RouteServiceRelationship[] = [];

  return namespaces.reduce((relationships, namespace) => {
    return [...relationships, ...createNsRouteServiceRelationships(namespace)];
  }, defaultRelationships);
}

function createNsRouteServiceRelationships(namespace: NamespaceData): RouteServiceRelationship[] {
  const defaultRelationships: RouteServiceRelationship[] = [];

  return namespace.routes.reduce((relationships, route) => {
    if (route.spec.to.kind !== "Service") {
      return relationships;
    }

    const service = namespace.services.find(s => s.metadata.name === route.spec.to.name);

    if (!service) {
      return relationships;
    }

    return [...relationships, createRelationship(route, service)];
  }, defaultRelationships);
}

function createRelationship(route: Route, service: Service): RouteServiceRelationship {
  const parentKey = generateEntityKey(ROUTE_ENTITY_TYPE, route.metadata.uid);
  const childKey = generateEntityKey(SERVICE_ENTITY_TYPE, service.metadata.uid);
  const relationshipKey = generateRelationshipKey(parentKey, childKey, ROUTE_SERVICE_RELATIONSHIP_CLASS);

  const relationship: RouteServiceRelationship = {
    _class: ROUTE_SERVICE_RELATIONSHIP_CLASS,
    _fromEntityKey: parentKey,
    _key: relationshipKey,
    _type: ROUTE_SERVICE_RELATIONSHIP_TYPE,
    _toEntityKey: childKey,
  };

  return relationship;
}
