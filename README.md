# MyFlixAngularClient

## Description

MyFlix is a single-page, responsive movie app built with [Angular](https://github.com/angular), with routing and several
interface views. This client-side supports [myFlix API](https://github.com/cmr927/myFlix), the existing server-side code (REST API and database) by facilitating user requests and rendering the response from the server-side via a number of different interface views. 

MyFlix provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

## Features

- Displays a welcome view where users will be able to either log in or register an
account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where
additional movie details will be displayed. The single movie view will contain the following
additional features:
    - A button that when clicked takes a user to the director view, where details about the
director of that particular movie will be displayed.
    - A button that when clicked takes a user to the genre view, where details about that
particular genre of the movie will be displayed.

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
- typescript

## Prerequisites
- Node.js

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:1234/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
