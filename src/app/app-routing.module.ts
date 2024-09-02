import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Array of route configurations for the application.
 * Currently, no routes are defined.
 */

const routes: Routes = [];

@NgModule({
    /**
   * Imports RouterModule and configures it with the routes.
   * The `forRoot` method creates a module that contains all the directives, the given routes, and the router service itself.
   */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
