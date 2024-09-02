import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * Check if the application is running in production mode.
 * If so, enable Angular's production mode to optimize performance.
 */
if (environment.production) {
  enableProdMode();
}

/**
 * Bootstrap the Angular application with the root module (AppModule).
 * If the bootstrap process fails, log the error to the console.
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
