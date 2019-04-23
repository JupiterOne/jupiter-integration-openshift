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
  labels?: {
    [name: string]: string;
  };
}

export interface OpenshiftEntity {
  metadata: Metadata;
}

export interface Group extends OpenshiftEntity {
  users: string[];
}

export interface User extends OpenshiftEntity {
  fullName?: string;
  groups?: string[] | null;
}

interface Ref {
  kind: string;
  namespace: string;
  name: string;
  uid: string;
  resourceVersion: string;
}

interface Address {
  ip: string;
  nodeName: string;
  targetRef: Ref;
}

interface HealthcheckEndpoint {
  path: string;
  port: number;
  scheme: string;
}

interface Port {
  name: string;
  port: number;
  protocol: string;
  targetPort?: number;
}

interface EndpointSubset {
  addresses: Address[];
  ports: Port[];
}

export interface Endpoint extends OpenshiftEntity {
  subsets: EndpointSubset[];
}

interface Volume {
  name: string;
  persistentVolumeClaim?: {
    claimName?: string;
  };
  secret?: {
    secretName: string;
    defaultMode: number;
  };
}
interface Secret {
  name: string;
}
interface EnvVar {
  name: string;
  value: string;
}

interface VolumeMounts {
  name: string;
  mountPath: string;
}

interface Probe {
  httpGet: HealthcheckEndpoint;
  initialDelaySeconds: number;
  timeoutSeconds: number;
  periodSeconds: number;
  successThreshold: number;
  failureThreshold: number;
}

interface SecurityContext {
  [key: string]:
    | { [key: string]: string | number | string[] | boolean }
    | number
    | string
    | boolean;
}

export interface Container {
  name: string;
  image: string;
  env: EnvVar[];
  resources: {
    limits: {
      cpu: string;
      memory: string;
    };
    requests: {
      cpu: string;
      memory: string;
    };
  };
  volumeMounts: VolumeMounts[];
  livenessProbe: Probe;
  readinessProbe: Probe;
  terminationMessagePath: string;
  terminationMessagePolicy: string;
  imagePullPolicy: string;
  securityContext: SecurityContext;
}

interface Toleration {
  key: string;
  operator: string;
  effect: string;
}

interface Condition {
  type: string;
  status: string;
  lastProbeTime: string | null;
  lastTransitionTime: string | null;
}

interface State {
  running?: {
    startedAt: string;
  };
}

interface ContainerStatus {
  name: string;
  state: State;
  lastState: State;
  ready: boolean;
  restartCount: number;
  image: string;
  imageID: string;
  containerID: string;
}

export interface Pod extends OpenshiftEntity {
  spec: {
    volumes: Volume[];
    containers: Container[];
    restartPolicy: string;
    terminationGracePeriodSeconds: number;
    dnsPolicy: string;
    nodeSelector: {
      type: string;
    };
    serviceAccountName: string;
    serviceAccount: string;
    nodeName: string;
    securityContext: SecurityContext;
    imagePullSecrets: Secret[];
    schedulerName: string;
    tolerations: Toleration[];
    priority: number;
  };
  status: {
    phase: string;
    conditions: Condition[];
    hostIP: string;
    podIP: string;
    startTime: string;
    containerStatuses: ContainerStatus[];
    qosClass: string;
  };
}

export interface Project extends OpenshiftEntity {
  spec: {
    finalizers: string[];
  };
  status: {
    phase: string;
  };
}

export interface ServiceAccount extends OpenshiftEntity {
  secrets: Secret[];
  imagePullSecrets: Secret[];
}

export interface Service extends OpenshiftEntity {
  spec: {
    ports: Port[];
    selector: {
      name?: string;
    };
    clusterIP: string;
    type: string;
    sessionAffinity: string;
  };
  status: {
    loadBalancer: any;
  };
}

export interface Route extends OpenshiftEntity {
  spec: {
    host: string;
    to: {
      kind: string;
      name: string;
      weight: number;
    };
  };
}

export interface OpenshiftDataModel {
  groups: Group[];
  projects: Project[];
  users: User[];
  namespaces: NamespaceData[];
}

export interface NamespaceData {
  project: Project;
  serviceAccounts: ServiceAccount[];
  services: Service[];
  pods: Pod[];
  routes: Route[];
}
