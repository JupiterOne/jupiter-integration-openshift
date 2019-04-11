// Type definitions for openshift-rest-client 1.6.4
// Project: https://github.com/nodeshift/openshift-rest-client
// Definitions by: Adam Williams <https://github.com/aiwilliams/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*~ Note that ES6 modules cannot directly export callable functions.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

export = openshiftRestClient;

declare function openshiftRestClient(): openshiftRestClient.OpenshiftClient;
declare function openshiftRestClient(
  settings: openshiftRestClient.Settings,
): openshiftRestClient.Client;

// tslint:disable:no-namespace
declare namespace openshiftRestClient {
  interface Context {
    cluster: string;
    namespace: string;
    user: string;
  }

  interface TokenUser {
    token: string;
  }

  interface Config {
    apiVersion: string;
    context: Context;
    user: TokenUser;
    cluster: string;
  }

  interface Settings {
    config: Config;
  }

  interface EndpointFunction<T> {
    (): Promise<T>;
  }

  interface Metadata {
    uid: string;
    name: string;
    selfLink: string;
    resourceVersion: string;
    creationTimestamp: string;
    namespace?: string;
    generation?: number;
    annotations?: string[];
    labels?: string[];
  }

  interface Group {
    metadata: Metadata;
    users: string[]
  }

  interface User {
    metadata: Metadata;
    fullName: string;
    groups: string[];
  }

  interface Project {
    metadata: Metadata;
    spec: {
      finalizers: string[];
    };
    status: {
      phase: string
    };
  }

  interface ListResponse<T> {
    items: T[];
  }

  interface ListEndpoint<T> {
    findAll: EndpointFunction<ListResponse<T>>;
  }

  export interface Client {
    groups: ListEndpoint<Group>;
    projects: ListEndpoint<Project>;
    users: ListEndpoint<User>;
  }
}
