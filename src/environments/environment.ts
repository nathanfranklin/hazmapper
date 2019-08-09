// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { jwt } from './jwt';

export interface AppEnvironment {
  production: boolean;
  apiUrl: string;
  jwt?: string;
}

export const  environment : AppEnvironment =  {
  production: false,
  apiUrl: 'http://geoapi.local:8888',
  jwt: jwt
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
