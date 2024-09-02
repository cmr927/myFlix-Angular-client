import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DirectorComponent } from './director/director.component';
import { GenreComponent } from './genre/genre.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { NavbarComponent } from './navbar/navbar.component';

/**
 * Array of route configurations for the application.
 * Defines routes and their corresponding components.
 */

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  {path: 'profile', component: UserProfileComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
    /**
   * Declarations array that contains the components, directives, and pipes that belong to this module.
   */

  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    DirectorComponent,
    GenreComponent,
    SynopsisComponent,
    NavbarComponent
  ],
    /**
   * Imports array that brings in other modules that are required by components in this module.
   */
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes)
  ],
    /**
   * Providers array that specifies the services that are available for dependency injection.
   */
  providers: [MovieCardComponent],
    /**
   * Bootstrap array that defines the root component to bootstrap the Angular application.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
