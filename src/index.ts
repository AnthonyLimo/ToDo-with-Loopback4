import {TutorialApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {TutorialApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TutorialApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
