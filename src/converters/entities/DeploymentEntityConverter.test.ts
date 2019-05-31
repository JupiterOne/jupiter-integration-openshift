import { createDeploymentEntities } from "./DeploymentEntityConverter";

test("convert deployments", async () => {
  const deployments = [
    {
      metadata: {
        name: "jenkins-1",
        namespace: "test-jenkins-dualboot",
        selfLink:
          "/api/v1/namespaces/test-jenkins-dualboot/replicationcontrollers/jenkins-1",
        uid: "c46d03c5-61bf-11e9-b220-0a2a2b777307",
        resourceVersion: "3601372850",
        generation: 3,
        creationTimestamp: "2019-04-18T09:53:07Z",
        labels: {
          app: "jenkins-persistent",
          "openshift.io/deployment-config.name": "jenkins",
          template: "jenkins-persistent-template",
        },
        annotations: {
          "openshift.io/deployer-pod.completed-at":
            "2019-04-18 09:56:04 +0000 UTC",
          "openshift.io/deployer-pod.created-at":
            "2019-04-18 09:53:07 +0000 UTC",
          "openshift.io/deployer-pod.name": "jenkins-1-deploy",
          "openshift.io/deployment-config.latest-version": "1",
          "openshift.io/deployment-config.name": "jenkins",
          "openshift.io/deployment.phase": "Complete",
          "openshift.io/deployment.replicas": "1",
          "openshift.io/deployment.status-reason": "config change",
          "openshift.io/encoded-deployment-config":
            '{"kind":"DeploymentConfig","apiVersion":"apps.openshift.io/v1","metadata":{"name":"jenkins","namespace":"test-jenkins-dualboot","selfLink":"/apis/apps.openshift.io/v1/namespaces/test-jenkins-dualboot/deploymentconfigs/jenkins","uid":"c3cb3220-61bf-11e9-b220-0a2a2b777307","resourceVersion":"3548833710","generation":2,"creationTimestamp":"2019-04-18T09:53:06Z","labels":{"app":"jenkins-persistent","template":"jenkins-persistent-template"},"annotations":{"template.alpha.openshift.io/wait-for-ready":"true"}},"spec":{"strategy":{"type":"Recreate","recreateParams":{"timeoutSeconds":600},"resources":{},"activeDeadlineSeconds":21600},"triggers":[{"type":"ImageChange","imageChangeParams":{"automatic":true,"containerNames":["jenkins"],"from":{"kind":"ImageStreamTag","namespace":"openshift","name":"jenkins:2"},"lastTriggeredImage":"docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f"}},{"type":"ConfigChange"}],"replicas":1,"revisionHistoryLimit":10,"test":false,"selector":{"name":"jenkins"},"template":{"metadata":{"creationTimestamp":null,"labels":{"name":"jenkins"}},"spec":{"volumes":[{"name":"jenkins-data","persistentVolumeClaim":{"claimName":"jenkins"}}],"containers":[{"name":"jenkins","image":"docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f","env":[{"name":"OPENSHIFT_ENABLE_OAUTH","value":"true"},{"name":"OPENSHIFT_ENABLE_REDIRECT_PROMPT","value":"true"},{"name":"DISABLE_ADMINISTRATIVE_MONITORS","value":"true"},{"name":"KUBERNETES_MASTER","value":"https://kubernetes.default:443"},{"name":"KUBERNETES_TRUST_CERTIFICATES","value":"true"},{"name":"JENKINS_SERVICE_NAME","value":"jenkins"},{"name":"JNLP_SERVICE_NAME","value":"jenkins-jnlp"},{"name":"ENABLE_FATAL_ERROR_LOG_FILE","value":"false"}],"resources":{"limits":{"memory":"512Mi"}},"volumeMounts":[{"name":"jenkins-data","mountPath":"/var/lib/jenkins"}],"livenessProbe":{"httpGet":{"path":"/login","port":8080,"scheme":"HTTP"},"initialDelaySeconds":420,"timeoutSeconds":240,"periodSeconds":360,"successThreshold":1,"failureThreshold":2},"readinessProbe":{"httpGet":{"path":"/login","port":8080,"scheme":"HTTP"},"initialDelaySeconds":3,"timeoutSeconds":240,"periodSeconds":10,"successThreshold":1,"failureThreshold":3},"terminationMessagePath":"/dev/termination-log","terminationMessagePolicy":"File","imagePullPolicy":"IfNotPresent","securityContext":{"capabilities":{},"privileged":false}}],"restartPolicy":"Always","terminationGracePeriodSeconds":30,"dnsPolicy":"ClusterFirst","serviceAccountName":"jenkins","serviceAccount":"jenkins","securityContext":{},"schedulerName":"default-scheduler"}}},"status":{"latestVersion":1,"observedGeneration":1,"replicas":0,"updatedReplicas":0,"availableReplicas":0,"unavailableReplicas":0,"details":{"message":"config change","causes":[{"type":"ConfigChange"}]},"conditions":[{"type":"Available","status":"False","lastUpdateTime":"2019-04-18T09:53:06Z","lastTransitionTime":"2019-04-18T09:53:06Z","message":"Deployment config does not have minimum availability."}]}}\n',
        },
        ownerReferences: [
          {
            apiVersion: "apps.openshift.io/v1",
            kind: "DeploymentConfig",
            name: "jenkins",
            uid: "c3cb3220-61bf-11e9-b220-0a2a2b777307",
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        replicas: 0,
        selector: {
          deployment: "jenkins-1",
          deploymentconfig: "jenkins",
          name: "jenkins",
        },
        template: {
          metadata: {
            creationTimestamp: null,
            labels: {
              deployment: "jenkins-1",
              deploymentconfig: "jenkins",
              name: "jenkins",
            },
            annotations: {
              "openshift.io/deployment-config.latest-version": "1",
              "openshift.io/deployment-config.name": "jenkins",
              "openshift.io/deployment.name": "jenkins-1",
            },
          },
          spec: {
            volumes: [
              {
                name: "jenkins-data",
                persistentVolumeClaim: { claimName: "jenkins" },
              },
            ],
            containers: [
              {
                name: "jenkins",
                image:
                  "docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f",
                env: [
                  { name: "OPENSHIFT_ENABLE_OAUTH", value: "true" },
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
                  { name: "KUBERNETES_TRUST_CERTIFICATES", value: "true" },
                  { name: "JENKINS_SERVICE_NAME", value: "jenkins" },
                  { name: "JNLP_SERVICE_NAME", value: "jenkins-jnlp" },
                  { name: "ENABLE_FATAL_ERROR_LOG_FILE", value: "false" },
                ],
                resources: { limits: { memory: "512Mi" } },
                volumeMounts: [
                  { name: "jenkins-data", mountPath: "/var/lib/jenkins" },
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
                imagePullPolicy: "IfNotPresent",
                securityContext: { capabilities: {}, privileged: false },
              },
            ],
            restartPolicy: "Always",
            terminationGracePeriodSeconds: 30,
            dnsPolicy: "ClusterFirst",
            serviceAccountName: "jenkins",
            serviceAccount: "jenkins",
            securityContext: {},
            schedulerName: "default-scheduler",
          },
        },
      },
      status: { replicas: 0, observedGeneration: 3 },
    },
    {
      metadata: {
        name: "jenkins-2",
        namespace: "test-jenkins-dualboot",
        selfLink:
          "/api/v1/namespaces/test-jenkins-dualboot/replicationcontrollers/jenkins-2",
        uid: "69d811b4-77d1-11e9-9823-0a69cdf75e6f",
        resourceVersion: "3603567139",
        generation: 2,
        creationTimestamp: "2019-05-16T11:54:51Z",
        labels: {
          app: "jenkins-persistent",
          "openshift.io/deployment-config.name": "jenkins",
          template: "jenkins-persistent-template",
        },
        annotations: {
          "openshift.io/deployer-pod.completed-at":
            "2019-05-16 11:58:12 +0000 UTC",
          "openshift.io/deployer-pod.created-at":
            "2019-05-16 11:54:51 +0000 UTC",
          "openshift.io/deployer-pod.name": "jenkins-2-deploy",
          "openshift.io/deployer-pod.started-at":
            "2019-05-16 11:54:52 +0000 UTC",
          "openshift.io/deployment-config.latest-version": "2",
          "openshift.io/deployment-config.name": "jenkins",
          "openshift.io/deployment.phase": "Complete",
          "openshift.io/deployment.replicas": "1",
          "openshift.io/deployment.status-reason": "config change",
          "openshift.io/encoded-deployment-config":
            '{"kind":"DeploymentConfig","apiVersion":"apps.openshift.io/v1","metadata":{"name":"jenkins","namespace":"test-jenkins-dualboot","selfLink":"/apis/apps.openshift.io/v1/namespaces/test-jenkins-dualboot/deploymentconfigs/jenkins","uid":"c3cb3220-61bf-11e9-b220-0a2a2b777307","resourceVersion":"3601372568","generation":3,"creationTimestamp":"2019-04-18T09:53:06Z","labels":{"app":"jenkins-persistent","template":"jenkins-persistent-template"},"annotations":{"template.alpha.openshift.io/wait-for-ready":"true"}},"spec":{"strategy":{"type":"Recreate","customParams":{},"recreateParams":{"timeoutSeconds":500},"resources":{},"activeDeadlineSeconds":21600},"triggers":[{"type":"ImageChange","imageChangeParams":{"automatic":true,"containerNames":["jenkins"],"from":{"kind":"ImageStreamTag","namespace":"openshift","name":"jenkins:2"},"lastTriggeredImage":"docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f"}},{"type":"ConfigChange"}],"replicas":1,"revisionHistoryLimit":10,"test":false,"selector":{"name":"jenkins"},"template":{"metadata":{"creationTimestamp":null,"labels":{"name":"jenkins"}},"spec":{"volumes":[{"name":"jenkins-data","persistentVolumeClaim":{"claimName":"jenkins"}}],"containers":[{"name":"jenkins","image":"docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f","env":[{"name":"OPENSHIFT_ENABLE_OAUTH","value":"true"},{"name":"OPENSHIFT_ENABLE_REDIRECT_PROMPT","value":"true"},{"name":"DISABLE_ADMINISTRATIVE_MONITORS","value":"true"},{"name":"KUBERNETES_MASTER","value":"https://kubernetes.default:443"},{"name":"KUBERNETES_TRUST_CERTIFICATES","value":"true"},{"name":"JENKINS_SERVICE_NAME","value":"jenkins"},{"name":"JNLP_SERVICE_NAME","value":"jenkins-jnlp"},{"name":"ENABLE_FATAL_ERROR_LOG_FILE","value":"false"},{"name":"CUSTOM","value":"123"}],"resources":{"limits":{"memory":"512Mi"}},"volumeMounts":[{"name":"jenkins-data","mountPath":"/var/lib/jenkins"}],"livenessProbe":{"httpGet":{"path":"/login","port":8080,"scheme":"HTTP"},"initialDelaySeconds":420,"timeoutSeconds":240,"periodSeconds":360,"successThreshold":1,"failureThreshold":2},"readinessProbe":{"httpGet":{"path":"/login","port":8080,"scheme":"HTTP"},"initialDelaySeconds":3,"timeoutSeconds":240,"periodSeconds":10,"successThreshold":1,"failureThreshold":3},"terminationMessagePath":"/dev/termination-log","terminationMessagePolicy":"File","imagePullPolicy":"IfNotPresent","securityContext":{"capabilities":{},"privileged":false}}],"restartPolicy":"Always","terminationGracePeriodSeconds":30,"dnsPolicy":"ClusterFirst","serviceAccountName":"jenkins","serviceAccount":"jenkins","securityContext":{},"schedulerName":"default-scheduler"}}},"status":{"latestVersion":2,"observedGeneration":2,"replicas":1,"updatedReplicas":1,"availableReplicas":1,"unavailableReplicas":0,"details":{"message":"config change","causes":[{"type":"ConfigChange"}]},"conditions":[{"type":"Progressing","status":"True","lastUpdateTime":"2019-04-18T09:56:05Z","lastTransitionTime":"2019-04-18T09:56:05Z","reason":"NewReplicationControllerAvailable","message":"replication controller \\"jenkins-1\\" successfully rolled out"},{"type":"Available","status":"True","lastUpdateTime":"2019-05-15T15:07:31Z","lastTransitionTime":"2019-05-15T15:07:31Z","message":"Deployment config has minimum availability."}],"readyReplicas":1}}\n',
        },
        ownerReferences: [
          {
            apiVersion: "apps.openshift.io/v1",
            kind: "DeploymentConfig",
            name: "jenkins",
            uid: "c3cb3220-61bf-11e9-b220-0a2a2b777307",
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        replicas: 1,
        selector: {
          deployment: "jenkins-2",
          deploymentconfig: "jenkins",
          name: "jenkins",
        },
        template: {
          metadata: {
            creationTimestamp: null,
            labels: {
              deployment: "jenkins-2",
              deploymentconfig: "jenkins",
              name: "jenkins",
            },
            annotations: {
              "openshift.io/deployment-config.latest-version": "2",
              "openshift.io/deployment-config.name": "jenkins",
              "openshift.io/deployment.name": "jenkins-2",
            },
          },
          spec: {
            volumes: [
              {
                name: "jenkins-data",
                persistentVolumeClaim: { claimName: "jenkins" },
              },
            ],
            containers: [
              {
                name: "jenkins",
                image:
                  "docker-registry.default.svc:5000/openshift/jenkins@sha256:3b6ad6c87518f153c6c38c5190f6d95535af3c8210adc8904d6a7f7f4180a36f",
                env: [
                  { name: "OPENSHIFT_ENABLE_OAUTH", value: "true" },
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
                  { name: "KUBERNETES_TRUST_CERTIFICATES", value: "true" },
                  { name: "JENKINS_SERVICE_NAME", value: "jenkins" },
                  { name: "JNLP_SERVICE_NAME", value: "jenkins-jnlp" },
                  { name: "ENABLE_FATAL_ERROR_LOG_FILE", value: "false" },
                  { name: "CUSTOM", value: "123" },
                ],
                resources: { limits: { memory: "512Mi" } },
                volumeMounts: [
                  { name: "jenkins-data", mountPath: "/var/lib/jenkins" },
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
                imagePullPolicy: "IfNotPresent",
                securityContext: { capabilities: {}, privileged: false },
              },
            ],
            restartPolicy: "Always",
            terminationGracePeriodSeconds: 30,
            dnsPolicy: "ClusterFirst",
            serviceAccountName: "jenkins",
            serviceAccount: "jenkins",
            securityContext: {},
            schedulerName: "default-scheduler",
          },
        },
      },
      status: {
        replicas: 1,
        fullyLabeledReplicas: 1,
        observedGeneration: 2,
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

  const entities = createDeploymentEntities([
    {
      pods: [],
      serviceAccounts: [],
      services: [],
      routes: [],
      project,
      deployments: deployments as any,
    },
  ]);

  expect(entities).toEqual([
    {
      _class: ["Deployment", "Group"],
      _key: "openshift_deployment_c46d03c5-61bf-11e9-b220-0a2a2b777307",
      _type: "openshift_deployment",
      createdOn: 1555581187000,
      displayName: "jenkins-1",
      isActive: false,
      name: "jenkins-1",
    },
    {
      _class: ["Deployment", "Group"],
      _key: "openshift_deployment_69d811b4-77d1-11e9-9823-0a69cdf75e6f",
      _type: "openshift_deployment",
      createdOn: 1558007691000,
      displayName: "jenkins-2",
      isActive: true,
      name: "jenkins-2",
    },
  ]);
});
