import { createContainerEntities } from "./ContainerEntityConverter";

test("convert containers", async () => {
  const pods = [
    {
      metadata: {
        name: "jenkins-1-vqgxg",
        generateName: "jenkins-1-",
        namespace: "example_namespace",
        selfLink: "/api/v1/namespaces/example_namespace/pods/jenkins-1-vqgxg",
        uid: "c764e7d4-61bf-11e9-b220-0a2a2b777307",
        resourceVersion: "3548837654",
        creationTimestamp: "2019-04-18T09:53:12Z",
        labels: {
          deployment: "jenkins-1",
          deploymentconfig: "jenkins",
          name: "jenkins",
        },
        annotations: {
          "kubernetes.io/limit-ranger":
            "LimitRanger plugin set: cpu request for container jenkins; cpu limit for container jenkins",
          "openshift.io/deployment-config.latest-version": "1",
          "openshift.io/deployment-config.name": "jenkins",
          "openshift.io/deployment.name": "jenkins-1",
          "openshift.io/scc": "restricted",
        },
        ownerReferences: [
          {
            apiVersion: "v1",
            kind: "ReplicationController",
            name: "jenkins-1",
            uid: "c46d03c5-61bf-11e9-b220-0a2a2b777307",
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        volumes: [
          {
            name: "jenkins-data",
            persistentVolumeClaim: {
              claimName: "jenkins",
            },
          },
          {
            name: "jenkins-token-w64vt",
            secret: {
              secretName: "jenkins-token-w64vt",
              defaultMode: 420,
            },
          },
        ],
        containers: [
          {
            name: "jenkins",
            image:
              "docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f",
            env: [
              {
                name: "OPENSHIFT_ENABLE_OAUTH",
                value: "true",
              },
              {
                name: "OPENSHIFT_ENABLE_REDIRECT_PROMPT",
                value: "true",
              },
              {
                name: "DISABLE_ADMINISTRATIVE_MONITORS",
                value: "true",
              },
              {
                name: "KUBERNETES_MASTER",
                value: "https://kubernetes.default:443",
              },
              {
                name: "KUBERNETES_TRUST_CERTIFICATES",
                value: "true",
              },
              {
                name: "JENKINS_SERVICE_NAME",
                value: "jenkins",
              },
              {
                name: "JNLP_SERVICE_NAME",
                value: "jenkins-jnlp",
              },
              {
                name: "ENABLE_FATAL_ERROR_LOG_FILE",
                value: "false",
              },
            ],
            resources: {
              limits: {
                cpu: "1",
                memory: "512Mi",
              },
              requests: {
                cpu: "20m",
                memory: "256Mi",
              },
            },
            volumeMounts: [
              {
                name: "jenkins-data",
                mountPath: "/var/lib/jenkins",
              },
              {
                name: "jenkins-token-w64vt",
                readOnly: true,
                mountPath: "/var/run/secrets/kubernetes.io/serviceaccount",
              },
            ],
            livenessProbe: {
              httpGet: {
                path: "/login",
                port: 8080,
                scheme: "HTTP",
              },
              initialDelaySeconds: 420,
              timeoutSeconds: 240,
              periodSeconds: 360,
              successThreshold: 1,
              failureThreshold: 2,
            },
            readinessProbe: {
              httpGet: {
                path: "/login",
                port: 8080,
                scheme: "HTTP",
              },
              initialDelaySeconds: 3,
              timeoutSeconds: 240,
              periodSeconds: 10,
              successThreshold: 1,
              failureThreshold: 3,
            },
            terminationMessagePath: "/dev/termination-log",
            terminationMessagePolicy: "File",
            imagePullPolicy: "Always",
            securityContext: {
              capabilities: {
                drop: ["KILL", "MKNOD", "NET_RAW", "SETGID", "SETUID"],
              },
              privileged: false,
              runAsUser: 1034810000,
            },
          },
        ],
        restartPolicy: "Always",
        terminationGracePeriodSeconds: 30,
        dnsPolicy: "ClusterFirst",
        nodeSelector: {
          type: "compute",
        },
        serviceAccountName: "jenkins",
        serviceAccount: "jenkins",
        nodeName: "ip-172-31-56-129.us-west-2.compute.internal",
        securityContext: {
          seLinuxOptions: {
            level: "s0:c187,c14",
          },
          fsGroup: 1034810000,
        },
        imagePullSecrets: [
          {
            name: "jenkins-dockercfg-vbsxs",
          },
        ],
        schedulerName: "default-scheduler",
        tolerations: [
          {
            key: "node.kubernetes.io/memory-pressure",
            operator: "Exists",
            effect: "NoSchedule",
          },
        ],
        priority: 0,
      },
      status: {
        phase: "Running",
        conditions: [
          {
            type: "Initialized",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2019-04-18T09:53:12Z",
          },
          {
            type: "Ready",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2019-04-18T09:56:03Z",
          },
          {
            type: "ContainersReady",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: null,
          },
          {
            type: "PodScheduled",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2019-04-18T09:53:12Z",
          },
        ],
        hostIP: "172.31.56.129",
        podIP: "10.131.29.54",
        startTime: "2019-04-18T09:53:12Z",
        containerStatuses: [
          {
            name: "jenkins",
            state: {
              running: {
                startedAt: "2019-04-18T09:53:27Z",
              },
            },
            lastState: {},
            ready: true,
            restartCount: 0,
            image:
              "docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f",
            imageID:
              "docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f",
            containerID:
              "cri-o://333c9b58ccca7b6eb89a0985e547a6238186c3dcbc321b77f0b9217fcc8ce7e1",
          },
        ],
        qosClass: "Burstable",
      },
    },
  ];

  const project = {
    metadata: {
      name: "default",
      selfLink: "/apis/project.openshift.io/v1/projects/default",
      uid: "39537998-5bb8-11e9-8c30-4e620801d617",
      resourceVersion: "1284",
      creationTimestamp: "2019-04-10T17:44:00Z",
      annotations: {},
    },
    spec: {
      finalizers: ["kubernetes"],
    },
    status: {
      phase: "Active",
    },
  };

  const entities = createContainerEntities([
    { pods, serviceAccounts: [], services: [], routes: [], project },
  ]);

  expect(entities).toEqual([
    {
      _class: "Task",
      name: "jenkins",
      image:
        "docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f",
      _key: "openshift_container_c764e7d4-61bf-11e9-b220-0a2a2b777307_jenkins",
      _type: "openshift_container",
      displayName: "jenkins",
    },
  ]);
});
