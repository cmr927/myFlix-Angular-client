# MyFlixAngularClient

## Description
MyFlix is a single-page, responsive movie app built with [Angular](https://github.com/angular), with routing and several
interface views. This client-side supports [myFlix API](https://github.com/cmr927/myFlix), the existing server-side code (REST API and database) by facilitating user requests and rendering the response from the server-side via a number of different interface views. 

MyFlix provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

## Link to Project
https://cmr927.github.io/myFlix-Angular-client

## Features
- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister
- Allow existing users to login and get a JWT token

## Dependencies
- angular
- rxjs
- tslib
- zone.js
- types
- codelyzer
- jasmine
- karma
- protractor
- ts-node
- tslint
- typedoc
- typescript

## Prerequisites
- Node.js

## Server-Side (backend) API
myFlix interacts with [myFlix API](https://github.com/cmr927/myflix), a custom API that contains all data relevant to the myFlix app, including information about movies, titles, descriptions, genres, directors, images, features, users, and more. Please refer to the API Documentation for information on API endpoints and data formats.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Authentication
This API uses JWT for authentication. All endpoints require a valid JWT token in the Authorization header.

## License
This project is licensed under the terms of the [ISC License](https://opensource.org/licenses/ISC).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
