import { NamespaceData, OpenshiftEntity } from "../../openshift/types";

import { PROJECT_ENTITY_TYPE } from "../../jupiterone";

import { generateEntityKey, generateRelationshipKey } from "../../utils/generateKeys";

import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export function createNamespaceRelationships(
  namespaces: NamespaceData[],
  objectKey: "routes" | "services" | "serviceAccounts" | "pods",
  objectEntityType: string,
  relationshipType: string,
  relationshipClass: string,
): RelationshipFromIntegration[] {
  const defaultValue: RelationshipFromIntegration[] = [];

  return namespaces.reduce((acc, namespace) => {
    const parentKey = generateEntityKey(PROJECT_ENTITY_TYPE, namespace.project.metadata.uid);

    const objects = (namespace[objectKey] as unknown) as OpenshiftEntity[];

    const relationships = objects.map((object: OpenshiftEntity) => {
      const childKey = generateEntityKey(objectEntityType, object.metadata.uid);
      const key = generateRelationshipKey(parentKey, childKey, relationshipClass);

      const relationship: RelationshipFromIntegration = {
        _class: relationshipClass,
        _fromEntityKey: parentKey,
        _key: key,
        _type: relationshipType,
        _toEntityKey: childKey,
      };

      return relationship;
    });

    return [...acc, ...relationships];
  }, defaultValue);
}
