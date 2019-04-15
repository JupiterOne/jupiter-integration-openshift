// tslint:disable:no-empty-interface

interface Metadata {
  uid: string;
  name: string;
  selfLink: string;
  resourceVersion: string;
  creationTimestamp: string;
  namespace?: string;
  generation?: number;
  annotations?: {
    [url: string]: string;
  };
  labels?: string[];
}

export interface Group {
  metadata: Metadata;
  users: string[];
}

export interface User {
  metadata: Metadata;
  fullName?: string;
  groups?: string[] | null;
}

export interface Project {
  metadata: Metadata;
  spec: {
    finalizers: string[];
  };
  status: {
    phase: string;
  };
}

export interface OpenshiftDataModel {
  groups: Group[];
  projects: Project[];
  users: User[];
}
