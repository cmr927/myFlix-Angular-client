(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/de2":
/*!********************************************************!*\
  !*** ./src/app/user-profile/user-profile.component.ts ***!
  \********************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fetch-api-data.service */ "trEW");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../movie-card/movie-card.component */ "0xBz");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");












/**
 * Component for user profile management.
 */
class UserProfileComponent {
    /**
       * Constructs the UserProfileComponent.
       * @param movieAPIDataiData - The service for fetching API data.
       * @param dialog - The dialog service for displaying dialogs.
       * @param snackBar - The snack bar service for displaying notifications.
       * @param router - The router service for navigation.
       */
    constructor(movieAPIData, dialog, snackBar, movieCardComponent, router) {
        this.movieAPIData = movieAPIData;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.movieCardComponent = movieCardComponent;
        this.router = router;
        /** Input for user data. */
        this.userData = { Username: '', Password: '', Email: '', Birthday: '' };
        /** Form data for user. */
        this.formUserData = {
            Username: '',
            Password: '',
            Email: '',
            Birthday: '',
            favoriteMovie: []
        };
        /** User object. */
        this.user = {};
        /** List of all movies. */
        this.movies = [];
        /** List of favorite movies. */
        this.favoritemovie = [];
        /** List of favorite movie IDs. */
        this.favoriteMoviesIDs = [];
    }
    /** Lifecycle hook called after component initialization. */ ngOnInit() {
        this.userData.Username = JSON.parse(localStorage.getItem('user')).Username;
        this.getProfile();
        this.getMovies(); // Call getMovies() on component initialization
        this.getFavMovies(); // Call getFavMovies() on component initialization
    }
    /**
       * Fetches user profile data.
       */
    getProfile() {
        this.movieAPIData.getUser(this.userData.Username).subscribe((result) => {
            this.user = result;
            this.userData.Username = this.user.Username;
            this.userData.Email = this.user.Email;
            if (this.user.Birthday) {
                let Birthday = new Date(this.user.Birthday);
                if (!isNaN(Birthday.getTime())) {
                    this.userData.Birthday = Birthday.toISOString().split('T')[0];
                }
            }
            this.formUserData = Object.assign({}, this.userData);
            this.favoriteMoviesIDs = this.user.favoritemovie;
            this.movieAPIData.getAllMovies().subscribe((movies) => {
                this.favoritemovie = movies.filter((movie) => this.favoriteMoviesIDs && this.favoriteMoviesIDs.includes(movie._id));
            });
        });
    }
    /**
       * Fetches all movies.
       */
    getMovies() {
        this.movieAPIData.getAllMovies().subscribe((result) => {
            if (Array.isArray(result)) {
                this.movies = result;
            }
            return this.movies;
        });
    }
    /**
       * Fetches user's favorite movies.
       */
    getFavMovies() {
        this.movieAPIData.getUser(this.userData.Username).subscribe((result) => {
            this.favoriteMoviesIDs = result.favoritemovie;
        });
    }
    /**
       * Checks if a movie is in the user's favorite movies list.
       * @param movie - The movie to check.
       * @returns True if the movie is a favorite, otherwise false.
       */
    isFav(movie) {
        return this.favoriteMoviesIDs.includes(movie._id);
    }
    /**
       * Toggles a movie in the user's favorite movies list.
       * @param movie - The movie to toggle.
       */
    /**
       * Adds a movie to the user's favorite movies list.
       * @param movie - The movie to add.
       */
    /**
       * Deletes a movie from the user's favorite movies list.
       * @param movie - The movie to remove from favorites.
       */
    /**
       * Updates user data.
       */
    editUser() {
        this.movieAPIData.editUser(this.userData.Username, this.userData.Password, this.userData.Email, this.userData.Birthday).subscribe((result) => {
            localStorage.setItem('user', JSON.stringify(result));
            this.snackBar.open('Your infomation was updated successfully!', 'OK', {
                duration: 2000,
            });
            this.getProfile();
        }, (error) => {
            console.log('Error updating user:', error);
            this.snackBar.open('Failed to update your infomation', 'OK', {
                duration: 2000,
            });
        });
    }
    /**
       * Deletes the user's account.
       */
    deleteUser() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (confirm('Do you want to delete your account permanently?')) {
                this.movieAPIData.deleteUser(this.user.Username).subscribe(() => {
                    this.snackBar.open('Account deleted successfully', 'OK', {
                        duration: 3000,
                    });
                    localStorage.clear();
                    this.router.navigate(['welcome']);
                });
            }
        });
    }
}
UserProfileComponent.ɵfac = function UserProfileComponent_Factory(t) { return new (t || UserProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_fetch_api_data_service__WEBPACK_IMPORTED_MODULE_2__["MovieAPIService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_5__["MovieCardComponent"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"])); };
UserProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserProfileComponent, selectors: [["app-user-profile"]], inputs: { userData: "userData" }, decls: 34, vars: 6, consts: [[1, "profile-page"], ["matInput", "", "type", "text", "placeholder", "Username", "name", "Username", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "password", "placeholder", "Password", "name", "Password", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "email", "placeholder", "Email", "name", "Email", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "date", "placeholder", "Birthday", "name", "Birthday", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", 3, "click"], [3, "isProfile"]], template: function UserProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Update your info");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UserProfileComponent_Template_input_ngModelChange_11_listener($event) { return ctx.userData.Username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UserProfileComponent_Template_input_ngModelChange_15_listener($event) { return ctx.userData.Password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UserProfileComponent_Template_input_ngModelChange_19_listener($event) { return ctx.userData.Email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Birthday");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UserProfileComponent_Template_input_ngModelChange_23_listener($event) { return ctx.userData.Birthday = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UserProfileComponent_Template_button_click_25_listener() { return ctx.editUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Update");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UserProfileComponent_Template_button_click_27_listener() { return ctx.deleteUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, " Permanently delete your account ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](29, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, " Your favorite movies ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "app-movie-card", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.userData.Username, "'s Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.userData.Username);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.userData.Password);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.userData.Email);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.userData.Birthday);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("isProfile", true);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_5__["MovieCardComponent"]], styles: [".profile-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2rem;\n  background-color: #f5f5f5;\n  color: #333;\n}\n.profile-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: 2rem;\n  color: #6200ea;\n}\n.profile-page[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n  color: #6200ea;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: 500px;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 1rem;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 0.75rem;\n  font-size: 1rem;\n  transition: border-color 0.3s ease;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #b884ff;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 500;\n  padding: 0.75rem 1.5rem;\n  margin-top: 1rem;\n  background-color: #6200ea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #4d00b7;\n}\n.profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n.profile-page[_ngcontent-%COMP%]   .favorite-movies[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  width: 100%;\n  max-width: 800px;\n}\n.profile-page[_ngcontent-%COMP%]   .favorite-movies[_ngcontent-%COMP%]   app-movie-card[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n@media (max-width: 768px) {\n  .profile-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .profile-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .profile-page[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .profile-page[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    padding: 1rem;\n    max-width: 100%;\n  }\n  .profile-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-top: 0.5rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1wcm9maWxlL3VzZXItcHJvZmlsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQWRpQjtFQWVqQixXQWRXO0FBR2I7QUFhRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQXRCWTtBQVdoQjtBQWNFO0VBQ0UsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBNUJZO0FBZ0JoQjtBQWVFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxrQkEvQlk7RUFnQ1osd0NBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFiSjtBQWVJO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0FBYk47QUFlTTtFQUNFLHlCQUFBO0VBQ0Esa0JBMUNRO0VBMkNSLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtDQUFBO0FBYlI7QUFlUTtFQUNFLHFCQTlDVTtFQStDViw2QkFBQTtBQWJWO0FBa0JJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQTdEUztFQThEVCxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQTlEVTtFQStEVixlQUFBO0VBQ0Esc0NBQUE7QUFoQk47QUFrQk07RUFDRSx5QkFwRWE7QUFvRHJCO0FBbUJNO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBakJSO0FBdUJFO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFyQko7QUF1Qkk7RUFDRSxtQkFBQTtBQXJCTjtBQTJCQTtFQUNFO0lBQ0UsYUFBQTtFQXhCRjtFQTBCRTtJQUNFLGVBQUE7RUF4Qko7RUEyQkU7SUFDRSxrQkFBQTtFQXpCSjtFQTRCRTtJQUNFLGFBQUE7SUFDQSxlQUFBO0VBMUJKO0VBNkJFO0lBQ0UsV0FBQTtJQUNBLGtCQUFBO0VBM0JKO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC91c2VyLXByb2ZpbGUvdXNlci1wcm9maWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVmaW5lIHlvdXIgY29sb3IgcGFsZXR0ZSBhbmQgY29tbW9uIHN0eWxlc1xyXG4kcHJpbWFyeS1jb2xvcjogIzYyMDBlYTtcclxuJHNlY29uZGFyeS1jb2xvcjogIzAzZGFjNjtcclxuJGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiR0ZXh0LWNvbG9yOiAjMzMzO1xyXG4kYnV0dG9uLWNvbG9yOiAjNjIwMGVhO1xyXG4kYnV0dG9uLWhvdmVyLWNvbG9yOiBkYXJrZW4oJGJ1dHRvbi1jb2xvciwgMTAlKTtcclxuJGJvcmRlci1yYWRpdXM6IDhweDtcclxuJGlucHV0LWJvcmRlci1jb2xvcjogI2UwZTBlMDtcclxuJGlucHV0LWZvY3VzLWNvbG9yOiBsaWdodGVuKCRwcmltYXJ5LWNvbG9yLCAzMCUpO1xyXG5cclxuLy8gTWFpbiBwcm9maWxlIHBhZ2UgY29udGFpbmVyXHJcbi5wcm9maWxlLXBhZ2Uge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDJyZW07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XHJcbiAgY29sb3I6ICR0ZXh0LWNvbG9yO1xyXG5cclxuICBoMSB7XHJcbiAgICBmb250LXNpemU6IDIuNXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbiAgICBjb2xvcjogJHByaW1hcnktY29sb3I7XHJcbiAgfVxyXG5cclxuICBoMiB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBjb2xvcjogJHByaW1hcnktY29sb3I7XHJcbiAgfVxyXG5cclxuICBmb3JtIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMnJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzO1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiA1MDBweDtcclxuXHJcbiAgICBtYXQtZm9ybS1maWVsZCB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICAgICAgaW5wdXQge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRpbnB1dC1ib3JkZXItY29sb3I7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXM7XHJcbiAgICAgICAgcGFkZGluZzogMC43NXJlbTtcclxuICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuM3MgZWFzZTtcclxuXHJcbiAgICAgICAgJjpmb2N1cyB7XHJcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRpbnB1dC1mb2N1cy1jb2xvcjtcclxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCAkaW5wdXQtZm9jdXMtY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcclxuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJ1dHRvbi1jb2xvcjtcclxuICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzO1xyXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG5cclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJ1dHRvbi1ob3Zlci1jb2xvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgJjpmb2N1cyB7XHJcbiAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggbGlnaHRlbigkYnV0dG9uLWNvbG9yLCAzMCUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGYXZvcml0ZSBtb3ZpZXMgc2VjdGlvbiBzdHlsaW5nXHJcbiAgLmZhdm9yaXRlLW1vdmllcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xyXG5cclxuICAgIGFwcC1tb3ZpZS1jYXJkIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpdmUgZGVzaWduIGZvciBzbWFsbGVyIHNjcmVlbnNcclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLnByb2ZpbGUtcGFnZSB7XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG5cclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGgyIHtcclxuICAgICAgZm9udC1zaXplOiAxLjI1cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm0ge1xyXG4gICAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UserProfileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-user-profile',
                templateUrl: './user-profile.component.html',
                styleUrls: ['./user-profile.component.scss']
            }]
    }], function () { return [{ type: _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_2__["MovieAPIService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"] }, { type: _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_5__["MovieCardComponent"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }]; }, { userData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\cmreg\Documents\careerfoundry\myFlix-Angular-client\src\main.ts */"zUnb");


/***/ }),

/***/ "0xBz":
/*!****************************************************!*\
  !*** ./src/app/movie-card/movie-card.component.ts ***!
  \****************************************************/
/*! exports provided: MovieCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieCardComponent", function() { return MovieCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _director_director_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../director/director.component */ "QJ6H");
/* harmony import */ var _genre_genre_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../genre/genre.component */ "4POT");
/* harmony import */ var _synopsis_synopsis_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../synopsis/synopsis.component */ "kcGQ");
/* harmony import */ var _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fetch-api-data.service */ "trEW");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");













function MovieCardComponent_div_1_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MovieCardComponent_div_1_mat_card_1_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.openGenreDialog(movie_r1.Genre.Name, movie_r1.Genre.Description); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Genre ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MovieCardComponent_div_1_mat_card_1_Template_button_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.openDirectorDialog(movie_r1.Director.Name, movie_r1.Director.Bio, movie_r1.Director.Birth, movie_r1.Director.Death); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Director ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MovieCardComponent_div_1_mat_card_1_Template_button_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.openSynopsisDialog(movie_r1.Description); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Synopsis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MovieCardComponent_div_1_mat_card_1_Template_mat_icon_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.toggleFav(movie_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const movie_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](movie_r1.Title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Directed by: ", movie_r1.Director.Name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", movie_r1.ImagePath, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", movie_r1.Title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.isFav(movie_r1._id) ? "favorite" : "favorite_border");
} }
function MovieCardComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MovieCardComponent_div_1_mat_card_1_Template, 16, 5, "mat-card", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const movie_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isFav(movie_r1._id) || !ctx_r0.isProfile);
} }
class MovieCardComponent {
    constructor(movieApiData, dialog, router, snackBar) {
        this.movieApiData = movieApiData;
        this.dialog = dialog;
        this.router = router;
        this.snackBar = snackBar;
        this.movies = [];
        this.favoriteMovies = [];
        this.isProfile = false;
    }
    ngOnInit() {
        this.getMovies();
        this.getFavoriteMovies();
    }
    // This is the function that will get all movies when the /movies page loads
    getMovies() {
        this.movieApiData.getAllMovies().subscribe((resp) => {
            this.movies = resp;
            return this.movies;
        });
    }
    ;
    // This is the function that will get all favotie movies when the /movies page loads
    getFavoriteMovies() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.movieApiData.getUser(user.Username).subscribe((resp) => {
            this.favoriteMovies = resp.FavoriteMovies;
        });
    }
    ;
    // This is the function that will open the dialog when the director button is clicked  
    openDirectorDialog(directorName, directorBio, directorBirth, directorDeath) {
        this.dialog.open(_director_director_component__WEBPACK_IMPORTED_MODULE_1__["DirectorComponent"], {
            data: { directorName: directorName, directorBio: directorBio, directorBirth, directorDeath },
            width: '280px'
        });
    }
    ;
    // This is the function that will open the dialog when the genre button is clicked  
    openGenreDialog(genreName, genreDescription) {
        this.dialog.open(_genre_genre_component__WEBPACK_IMPORTED_MODULE_2__["GenreComponent"], {
            data: { genreName: genreName, genreDescription: genreDescription },
            width: '280px'
        });
    }
    ;
    // This is the function that will open the dialog when the synopsis button is clicked  
    openSynopsisDialog(synopsis) {
        this.dialog.open(_synopsis_synopsis_component__WEBPACK_IMPORTED_MODULE_3__["SynopsisComponent"], {
            data: { synopsis: synopsis },
            width: '280px'
        });
    }
    ;
    // This is the function that toggles the movie in the user's favorites  
    toggleFav(movie) {
        if (this.isFav(movie._id)) {
            this.deleteFavMovies(movie);
        }
        else {
            this.addFavMovies(movie);
        }
    }
    ;
    // This is the function that will add the movie to the user's favorites when the heart button is clicked  
    addFavMovies(movie) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            this.movieApiData.addFavoriteMovies(movie, movie._id, user.Username).subscribe((result) => {
                localStorage.setItem('user', JSON.stringify(result));
                this.getFavoriteMovies();
                this.snackBar.open(`${movie.Title} has been added to your favorites`, 'OK', {
                    duration: 1000,
                });
            });
        }
    }
    ;
    // This is the function that will add the movie to the user's favorites when the heart button is clicked  
    deleteFavMovies(movie) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            this.movieApiData.deleteMovie(movie._id, user.Username).subscribe((result) => {
                localStorage.setItem('user', JSON.stringify(result));
                this.getFavoriteMovies();
                this.snackBar.open(`${movie.Title} has been removed from your favorites`, 'OK', {
                    duration: 1000,
                });
            });
        }
    }
    ;
    // This is the function that will indicate via the heart button whether or not a movie is a favorite
    isFav(movieID) {
        return this.favoriteMovies.includes(movieID);
    }
    ;
}
MovieCardComponent.ɵfac = function MovieCardComponent_Factory(t) { return new (t || MovieCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fetch_api_data_service__WEBPACK_IMPORTED_MODULE_4__["MovieAPIService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"])); };
MovieCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MovieCardComponent, selectors: [["app-movie-card"]], inputs: { isProfile: "isProfile" }, decls: 2, vars: 1, consts: [[1, "movie-card-page", 2, "display", "flex"], [4, "ngFor", "ngForOf"], ["class", "movie-card-margin", 4, "ngIf"], [1, "movie-card-margin"], [1, "movie-card-image", 3, "src", "alt"], ["mat-button", "", "color", "primary", 3, "click"], [2, "cursor", "pointer", 3, "click"]], template: function MovieCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MovieCardComponent_div_1_Template, 2, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.movies);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIcon"]], styles: [".movie-card-page[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  background-color: #f5f5f5;\n  text-align: center;\n  color: #333;\n}\n.movie-card-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: 2rem;\n  color: #6200ea;\n}\n.movie-card-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 500;\n  padding: 0.75rem 1.5rem;\n  margin: 0.5rem;\n  background-color: #6200ea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n.movie-card-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #4d00b7;\n}\n.movie-card-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n@media (max-width: 768px) {\n  .movie-card-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .movie-card-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 80%;\n    margin: 0.5rem 0;\n  }\n}\n.movie-card-margin[_ngcontent-%COMP%] {\n  margin: 1em;\n}\n.movie-card-image[_ngcontent-%COMP%] {\n  max-height: 500px;\n  max-width: 500px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW92aWUtY2FyZC9tb3ZpZS1jYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBO0VBQ0UsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFYaUI7RUFZakIsa0JBQUE7RUFDQSxXQVpXO0FBR2I7QUFXRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQXBCWTtBQVdoQjtBQVlFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBeEJXO0VBeUJYLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBekJZO0VBMEJaLGVBQUE7RUFDQSxzQ0FBQTtBQVZKO0FBWUk7RUFDRSx5QkEvQmU7QUFxQnJCO0FBYUk7RUFDRSxhQUFBO0VBQ0EsNkJBQUE7QUFYTjtBQWlCQTtFQUVJO0lBQ0UsZUFBQTtFQWZKO0VBa0JFO0lBQ0UsVUFBQTtJQUNBLGdCQUFBO0VBaEJKO0FBQ0Y7QUFvQkE7RUFDQSxXQUFBO0FBbEJBO0FBc0JBO0VBQ0ksaUJBQUE7RUFDQSxnQkFBQTtBQW5CSiIsImZpbGUiOiJzcmMvYXBwL21vdmllLWNhcmQvbW92aWUtY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlZmluZSB5b3VyIGNvbG9yIHBhbGV0dGVcclxuJHByaW1hcnktY29sb3I6ICM2MjAwZWE7XHJcbiRzZWNvbmRhcnktY29sb3I6ICMwM2RhYzY7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4kdGV4dC1jb2xvcjogIzMzMztcclxuJGJ1dHRvbi1jb2xvcjogIzYyMDBlYTtcclxuJGJ1dHRvbi1ob3Zlci1jb2xvcjogZGFya2VuKCRidXR0b24tY29sb3IsIDEwJSk7XHJcbiRib3JkZXItcmFkaXVzOiA4cHg7XHJcblxyXG4vLyBHbG9iYWwgc3R5bGVzIGZvciB0aGUgbW92aWUgY2FyZCBwYWdlXHJcbi5tb3ZpZS1jYXJkLXBhZ2Uge1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogJHRleHQtY29sb3I7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMi41cmVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxuICAgIGNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcclxuICB9XHJcblxyXG4gIGJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XHJcbiAgICBtYXJnaW46IDAuNXJlbTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRidXR0b24tY29sb3I7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAkYm9yZGVyLXJhZGl1cztcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYnV0dG9uLWhvdmVyLWNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggbGlnaHRlbigkYnV0dG9uLWNvbG9yLCAzMCUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUmVzcG9uc2l2ZSBkZXNpZ25cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAubW92aWUtY2FyZC1wYWdlIHtcclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgIG1hcmdpbjogMC41cmVtIDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4ubW92aWUtY2FyZC1tYXJnaW57XHJcbm1hcmdpbjogMWVtXHJcbn1cclxuXHJcblxyXG4ubW92aWUtY2FyZC1pbWFnZSB7XHJcbiAgICBtYXgtaGVpZ2h0OiA1MDBweDsgXHJcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xyXG59ICJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MovieCardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-movie-card',
                templateUrl: './movie-card.component.html',
                styleUrls: ['./movie-card.component.scss']
            }]
    }], function () { return [{ type: _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_4__["MovieAPIService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"] }]; }, { movies: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
            args: [{ providedIn: 'root' }]
        }], isProfile: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "4POT":
/*!******************************************!*\
  !*** ./src/app/genre/genre.component.ts ***!
  \******************************************/
/*! exports provided: GenreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenreComponent", function() { return GenreComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");




class GenreComponent {
    constructor(data, dialog) {
        this.data = data;
        this.dialog = dialog;
    }
    ngOnInit() {
    }
}
GenreComponent.ɵfac = function GenreComponent_Factory(t) { return new (t || GenreComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"])); };
GenreComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GenreComponent, selectors: [["app-genre"]], decls: 5, vars: 2, template: function GenreComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Genre: ", ctx.data.genreName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data.genreDescription, " ");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2dlbnJlL2dlbnJlLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GenreComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-genre',
                templateUrl: './genre.component.html',
                styleUrls: ['./genre.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "LVDx":
/*!****************************************************************************!*\
  !*** ./src/app/user-registration-form/user-registration-form.component.ts ***!
  \****************************************************************************/
/*! exports provided: UserRegistrationFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRegistrationFormComponent", function() { return UserRegistrationFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetch-api-data.service */ "trEW");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");










class UserRegistrationFormComponent {
    constructor(movieApiData, dialogRef, snackBar) {
        this.movieApiData = movieApiData;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.userData = { Username: '', Password: '', Email: '', Birthday: '' };
    }
    ngOnInit() {
    }
    // This is the function responsible for sending the form inputs to the backend
    registerUser() {
        this.movieApiData.userRegistration(this.userData).subscribe((result) => {
            // Logic for a successful user registration goes here
            this.dialogRef.close(); // This will close the modal on success
            this.snackBar.open('Sign up successful!', 'OK', {
                duration: 2000
            });
        }, (result) => {
            console.log(result);
            this.snackBar.open('Something went wrong with the sign up', 'OK', {
                duration: 2000
            });
        });
    }
}
UserRegistrationFormComponent.ɵfac = function UserRegistrationFormComponent_Factory(t) { return new (t || UserRegistrationFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fetch_api_data_service__WEBPACK_IMPORTED_MODULE_1__["MovieAPIService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"])); };
UserRegistrationFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserRegistrationFormComponent, selectors: [["app-user-registration-form"]], inputs: { userData: "userData" }, decls: 17, vars: 4, consts: [["matInput", "", "placeholder", "Username", "type", "text", "name", "Username", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "password", "placeholder", "Password", "name", "Password", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "email", "placeholder", "Email", "name", "Email", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "date", "placeholder", "Birthday", "name", "Birthday", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", 3, "click"]], template: function UserRegistrationFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Sign Up!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserRegistrationFormComponent_Template_input_ngModelChange_7_listener($event) { return ctx.userData.Username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserRegistrationFormComponent_Template_input_ngModelChange_9_listener($event) { return ctx.userData.Password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserRegistrationFormComponent_Template_input_ngModelChange_11_listener($event) { return ctx.userData.Email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserRegistrationFormComponent_Template_input_ngModelChange_13_listener($event) { return ctx.userData.Birthday = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserRegistrationFormComponent_Template_button_click_15_listener() { return ctx.registerUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Sign Up ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.userData.Username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.userData.Password);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.userData.Email);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.userData.Birthday);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"]], styles: ["button[_ngcontent-%COMP%] {\n  background-color: #6200ea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: #4d00b7;\n}\nbutton[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n@media (max-width: 768px) {\n  .welcome-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .welcome-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 80%;\n    margin: 0.5rem 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1yZWdpc3RyYXRpb24tZm9ybS91c2VyLXJlZ2lzdHJhdGlvbi1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBO0VBRUkseUJBUFc7RUFRWCxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQVJZO0VBU1osZUFBQTtFQUNBLHNDQUFBO0FBVko7QUFZSTtFQUNFLHlCQWRlO0FBSXJCO0FBYUk7RUFDRSxhQUFBO0VBQ0EsNkJBQUE7QUFYTjtBQWdCQTtFQUVJO0lBQ0UsZUFBQTtFQWRKO0VBaUJFO0lBQ0UsVUFBQTtJQUNBLGdCQUFBO0VBZko7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3VzZXItcmVnaXN0cmF0aW9uLWZvcm0vdXNlci1yZWdpc3RyYXRpb24tZm9ybS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbG9yIHBhbGV0dGVcclxuJHByaW1hcnktY29sb3I6ICM2MjAwZWE7XHJcbiRzZWNvbmRhcnktY29sb3I6ICMwM2RhYzY7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4kdGV4dC1jb2xvcjogIzMzMztcclxuJGJ1dHRvbi1jb2xvcjogIzYyMDBlYTtcclxuJGJ1dHRvbi1ob3Zlci1jb2xvcjogZGFya2VuKCRidXR0b24tY29sb3IsIDEwJSk7XHJcbiRib3JkZXItcmFkaXVzOiA4cHg7XHJcblxyXG4vLyBHbG9iYWwgc3R5bGVzIGZvciB0aGUgcmVnaXN0cmF0aW9uXHJcbmJ1dHRvbiB7XHJcbiAgICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRidXR0b24tY29sb3I7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAkYm9yZGVyLXJhZGl1cztcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYnV0dG9uLWhvdmVyLWNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggbGlnaHRlbigkYnV0dG9uLWNvbG9yLCAzMCUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbi8vIFJlc3BvbnNpdmUgZGVzaWduXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC53ZWxjb21lLXBhZ2Uge1xyXG4gICAgaDEge1xyXG4gICAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserRegistrationFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-user-registration-form',
                templateUrl: './user-registration-form.component.html',
                styleUrls: ['./user-registration-form.component.scss']
            }]
    }], function () { return [{ type: _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_1__["MovieAPIService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }]; }, { userData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "QJ6H":
/*!************************************************!*\
  !*** ./src/app/director/director.component.ts ***!
  \************************************************/
/*! exports provided: DirectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectorComponent", function() { return DirectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");




class DirectorComponent {
    constructor(data, dialog) {
        this.data = data;
        this.dialog = dialog;
    }
    ngOnInit() {
    }
}
DirectorComponent.ɵfac = function DirectorComponent_Factory(t) { return new (t || DirectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"])); };
DirectorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DirectorComponent, selectors: [["app-director"]], decls: 5, vars: 4, template: function DirectorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Director: ", ctx.data.directorName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", ctx.data.directorBio, ", ", ctx.data.directorBirth, ", ", ctx.data.directorDeath, " ");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpcmVjdG9yL2RpcmVjdG9yLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DirectorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-director',
                templateUrl: './director.component.html',
                styleUrls: ['./director.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar/navbar.component */ "kWWo");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




/**
 * Represents the root component of the Angular application.
 */
class AppComponent {
    constructor() {
        /**
         * Title of the application.
         */
        this.title = 'myFlix-Angular-client';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-navbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    } }, directives: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__["NavbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _user_registration_form_user_registration_form_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./user-registration-form/user-registration-form.component */ "LVDx");
/* harmony import */ var _user_login_form_user_login_form_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./user-login-form/user-login-form.component */ "r0Ri");
/* harmony import */ var _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./movie-card/movie-card.component */ "0xBz");
/* harmony import */ var _welcome_page_welcome_page_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./welcome-page/welcome-page.component */ "fDIK");
/* harmony import */ var _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./user-profile/user-profile.component */ "/de2");
/* harmony import */ var _director_director_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./director/director.component */ "QJ6H");
/* harmony import */ var _genre_genre_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./genre/genre.component */ "4POT");
/* harmony import */ var _synopsis_synopsis_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./synopsis/synopsis.component */ "kcGQ");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./navbar/navbar.component */ "kWWo");



























const appRoutes = [
    { path: 'welcome', component: _welcome_page_welcome_page_component__WEBPACK_IMPORTED_MODULE_19__["WelcomePageComponent"] },
    { path: 'movies', component: _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_18__["MovieCardComponent"] },
    { path: 'profile', component: _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_20__["UserProfileComponent"] },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_18__["MovieCardComponent"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__["MatSnackBarModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_13__["MatToolbarModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"].forRoot(appRoutes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"],
        _user_registration_form_user_registration_form_component__WEBPACK_IMPORTED_MODULE_16__["UserRegistrationFormComponent"],
        _user_login_form_user_login_form_component__WEBPACK_IMPORTED_MODULE_17__["UserLoginFormComponent"],
        _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_18__["MovieCardComponent"],
        _welcome_page_welcome_page_component__WEBPACK_IMPORTED_MODULE_19__["WelcomePageComponent"],
        _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_20__["UserProfileComponent"],
        _director_director_component__WEBPACK_IMPORTED_MODULE_21__["DirectorComponent"],
        _genre_genre_component__WEBPACK_IMPORTED_MODULE_22__["GenreComponent"],
        _synopsis_synopsis_component__WEBPACK_IMPORTED_MODULE_23__["SynopsisComponent"],
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_24__["NavbarComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__["MatSnackBarModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_13__["MatToolbarModule"], _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"],
                    _user_registration_form_user_registration_form_component__WEBPACK_IMPORTED_MODULE_16__["UserRegistrationFormComponent"],
                    _user_login_form_user_login_form_component__WEBPACK_IMPORTED_MODULE_17__["UserLoginFormComponent"],
                    _movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_18__["MovieCardComponent"],
                    _welcome_page_welcome_page_component__WEBPACK_IMPORTED_MODULE_19__["WelcomePageComponent"],
                    _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_20__["UserProfileComponent"],
                    _director_director_component__WEBPACK_IMPORTED_MODULE_21__["DirectorComponent"],
                    _genre_genre_component__WEBPACK_IMPORTED_MODULE_22__["GenreComponent"],
                    _synopsis_synopsis_component__WEBPACK_IMPORTED_MODULE_23__["SynopsisComponent"],
                    _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_24__["NavbarComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__["MatSnackBarModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_13__["MatToolbarModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"].forRoot(appRoutes)
                ],
                providers: [_movie_card_movie_card_component__WEBPACK_IMPORTED_MODULE_18__["MovieCardComponent"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "fDIK":
/*!********************************************************!*\
  !*** ./src/app/welcome-page/welcome-page.component.ts ***!
  \********************************************************/
/*! exports provided: WelcomePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageComponent", function() { return WelcomePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _user_registration_form_user_registration_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user-registration-form/user-registration-form.component */ "LVDx");
/* harmony import */ var _user_login_form_user_login_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user-login-form/user-login-form.component */ "r0Ri");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");






class WelcomePageComponent {
    constructor(dialog) {
        this.dialog = dialog;
    }
    ngOnInit() {
    }
    // This is the function that will open the dialog when the signup button is clicked  
    openUserRegistrationDialog() {
        this.dialog.open(_user_registration_form_user_registration_form_component__WEBPACK_IMPORTED_MODULE_1__["UserRegistrationFormComponent"], {
            // Assigning the dialog a width
            width: '280px'
        });
    }
    ;
    // This is the function that will open the dialog when the login button is clicked  
    openUserLoginDialog() {
        this.dialog.open(_user_login_form_user_login_form_component__WEBPACK_IMPORTED_MODULE_2__["UserLoginFormComponent"], {
            width: '280px'
        });
    }
    ;
}
WelcomePageComponent.ɵfac = function WelcomePageComponent_Factory(t) { return new (t || WelcomePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"])); };
WelcomePageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomePageComponent, selectors: [["app-welcome-page"]], decls: 7, vars: 0, consts: [[1, "welcome-page"], ["mat-raised-button", "", "color", "primary", 2, "margin-right", "10px", 3, "click"]], template: function WelcomePageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Welcome to myFlix! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomePageComponent_Template_button_click_3_listener() { return ctx.openUserRegistrationDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Sign Up ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomePageComponent_Template_button_click_5_listener() { return ctx.openUserLoginDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"]], styles: [".welcome-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background-color: #f5f5f5;\n  text-align: center;\n  color: #333;\n}\n.welcome-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: 2rem;\n  color: #6200ea;\n}\n.welcome-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 500;\n  padding: 0.75rem 1.5rem;\n  margin: 0.5rem;\n  background-color: #6200ea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n.welcome-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #4d00b7;\n}\n.welcome-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n@media (max-width: 768px) {\n  .welcome-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .welcome-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 80%;\n    margin: 0.5rem 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2VsY29tZS1wYWdlL3dlbGNvbWUtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EseUJBYmlCO0VBY2pCLGtCQUFBO0VBQ0EsV0FkVztBQUtiO0FBV0U7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0F0Qlk7QUFhaEI7QUFZRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQTFCVztFQTJCWCxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQTNCWTtFQTRCWixlQUFBO0VBQ0Esc0NBQUE7QUFWSjtBQVlJO0VBQ0UseUJBakNlO0FBdUJyQjtBQWFJO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBWE47QUFpQkE7RUFFSTtJQUNFLGVBQUE7RUFmSjtFQWtCRTtJQUNFLFVBQUE7SUFDQSxnQkFBQTtFQWhCSjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvd2VsY29tZS1wYWdlL3dlbGNvbWUtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlZmluZSB5b3VyIGNvbG9yIHBhbGV0dGVcclxuJHByaW1hcnktY29sb3I6ICM2MjAwZWE7XHJcbiRzZWNvbmRhcnktY29sb3I6ICMwM2RhYzY7XHJcbiRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4kdGV4dC1jb2xvcjogIzMzMztcclxuJGJ1dHRvbi1jb2xvcjogIzYyMDBlYTtcclxuJGJ1dHRvbi1ob3Zlci1jb2xvcjogZGFya2VuKCRidXR0b24tY29sb3IsIDEwJSk7XHJcbiRib3JkZXItcmFkaXVzOiA4cHg7XHJcblxyXG4vLyBHbG9iYWwgc3R5bGVzIGZvciB0aGUgd2VsY29tZSBwYWdlXHJcbi53ZWxjb21lLXBhZ2Uge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuXHJcbiAgaDEge1xyXG4gICAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gICAgY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG4gIH1cclxuXHJcbiAgYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcclxuICAgIG1hcmdpbjogMC41cmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJ1dHRvbi1jb2xvcjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRidXR0b24taG92ZXItY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgJjpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCBsaWdodGVuKCRidXR0b24tY29sb3IsIDMwJSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIGRlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAud2VsY29tZS1wYWdlIHtcclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgIG1hcmdpbjogMC41cmVtIDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WelcomePageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-welcome-page',
                templateUrl: './welcome-page.component.html',
                styleUrls: ['./welcome-page.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "kWWo":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");





class NavbarComponent {
    constructor() { }
    ngOnInit() {
    }
    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    isLoggedIn() {
        if (!localStorage.getItem("token")) {
            return false;
        }
        else {
            return true;
        }
    }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(); };
NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], decls: 10, vars: 1, consts: [["color", "primary"], ["routerLink", "/movies", 1, "cursor"], [1, "spacer"], ["mat-button", "", "routerLink", "/movies"], ["mat-button", "", "routerLink", "/profile"], ["mat-button", "", "routerLink", "/welcome", 3, "click"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "myFlix");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_8_listener() { return ctx.onLoggedOut(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.isLoggedIn() ? "Logout" : "Login");
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__["MatToolbar"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatAnchor"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], styles: [".mat-toolbar[_ngcontent-%COMP%] {\n  background-color: #6200ea;\n  color: #f5f5f5;\n}\n\n.cursor[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.mat-button[_ngcontent-%COMP%] {\n  color: #f5f5f5;\n  cursor: pointer;\n  transition: #f5f5f5 0.3s ease;\n}\n\n.mat-button[_ngcontent-%COMP%]:hover {\n  background-color: #4d00b7;\n}\n\n.mat-button[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQTtFQUNJLHlCQVRZO0VBVVosY0FSZTtBQUFuQjs7QUFVRTtFQUNFLGVBQUE7QUFQSjs7QUFTRTtFQUNHLGNBZGM7RUFlZCxlQUFBO0VBQ0QsNkJBQUE7QUFOSjs7QUFRSTtFQUNFLHlCQUFBO0FBTk47O0FBU0k7RUFDRSxhQUFBO0VBQ0EsNkJBQUE7QUFQTjs7QUFVRTtFQUNFLGNBQUE7QUFQSiIsImZpbGUiOiJzcmMvYXBwL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZWZpbmUgeW91ciBjb2xvciBwYWxldHRlXHJcbiRwcmltYXJ5LWNvbG9yOiAjNjIwMGVhO1xyXG4kc2Vjb25kYXJ5LWNvbG9yOiAjMDNkYWM2O1xyXG4kYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuJHRleHQtY29sb3I6ICMzMzM7XHJcbiRidXR0b24tY29sb3I6ICM2MjAwZWE7XHJcbiRidXR0b24taG92ZXItY29sb3I6IGRhcmtlbigkYnV0dG9uLWNvbG9yLCAxMCUpO1xyXG4kYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuLm1hdC10b29sYmFye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XHJcbiAgICBjb2xvcjogJGJhY2tncm91bmQtY29sb3I7XHJcbiAgfVxyXG4gIC5jdXJzb3J7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG4gIC5tYXQtYnV0dG9ue1xyXG4gICAgIGNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcclxuICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiAkYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkYnV0dG9uLWNvbG9yLCAxMCUpO1xyXG4gICAgfVxyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggbGlnaHRlbigkYnV0dG9uLWNvbG9yLCAzMCUpO1xyXG4gICAgfVxyXG4gIH1cclxuICAuc3BhY2Vye1xyXG4gICAgZmxleDogMSAxIGF1dG87XHJcbiAgfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navbar',
                templateUrl: './navbar.component.html',
                styleUrls: ['./navbar.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "kcGQ":
/*!************************************************!*\
  !*** ./src/app/synopsis/synopsis.component.ts ***!
  \************************************************/
/*! exports provided: SynopsisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SynopsisComponent", function() { return SynopsisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");




class SynopsisComponent {
    constructor(data, dialog) {
        this.data = data;
        this.dialog = dialog;
    }
    ngOnInit() {
    }
}
SynopsisComponent.ɵfac = function SynopsisComponent_Factory(t) { return new (t || SynopsisComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"])); };
SynopsisComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SynopsisComponent, selectors: [["app-synopsis"]], decls: 3, vars: 1, template: function SynopsisComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data.synopsis, " ");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N5bm9wc2lzL3N5bm9wc2lzLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SynopsisComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-synopsis',
                templateUrl: './synopsis.component.html',
                styleUrls: ['./synopsis.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "r0Ri":
/*!**************************************************************!*\
  !*** ./src/app/user-login-form/user-login-form.component.ts ***!
  \**************************************************************/
/*! exports provided: UserLoginFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserLoginFormComponent", function() { return UserLoginFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetch-api-data.service */ "trEW");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");











class UserLoginFormComponent {
    constructor(movieApiData, dialogRef, snackBar, router) {
        this.movieApiData = movieApiData;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.router = router;
        this.userData = { username: '', password: '' };
    }
    ngOnInit() {
    }
    // This is the function responsible for sending the form inputs to the backend
    loginUser() {
        this.movieApiData.userLogin(this.userData).subscribe((result) => {
            // Logic for a successful user login goes here!
            this.dialogRef.close(); // This will close the modal on success!
            this.snackBar.open(`Login successful! Welcome ${result.user.Username}`, 'OK', {
                duration: 2000
            });
            if (result) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", result.token);
                this.router.navigate(['/movies']);
            }
            ;
        }, 
        // If login fails 
        (result) => {
            console.log(result);
            this.snackBar.open('Login failed', 'OK', {
                duration: 2000
            });
        });
    }
}
UserLoginFormComponent.ɵfac = function UserLoginFormComponent_Factory(t) { return new (t || UserLoginFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fetch_api_data_service__WEBPACK_IMPORTED_MODULE_1__["MovieAPIService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
UserLoginFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserLoginFormComponent, selectors: [["app-user-login-form"]], inputs: { userData: "userData" }, decls: 13, vars: 2, consts: [["matInput", "", "placeholder", "Username", "type", "text", "name", "username", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "password", "placeholder", "Password", "name", "password", "required", "", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", 3, "click"]], template: function UserLoginFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Log in");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserLoginFormComponent_Template_input_ngModelChange_7_listener($event) { return ctx.userData.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UserLoginFormComponent_Template_input_ngModelChange_9_listener($event) { return ctx.userData.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserLoginFormComponent_Template_button_click_11_listener() { return ctx.loginUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Log in ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.userData.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.userData.password);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"]], styles: ["button[_ngcontent-%COMP%] {\n  background-color: #6200ea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: #4d00b7;\n}\nbutton[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px #b884ff;\n}\n@media (max-width: 768px) {\n  .welcome-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .welcome-page[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 80%;\n    margin: 0.5rem 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1sb2dpbi1mb3JtL3VzZXItbG9naW4tZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQTtFQUVJLHlCQVBXO0VBUVgsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFSWTtFQVNaLGVBQUE7RUFDQSxzQ0FBQTtBQVZKO0FBWUk7RUFDRSx5QkFkZTtBQUlyQjtBQWFJO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBWE47QUFnQkE7RUFFSTtJQUNFLGVBQUE7RUFkSjtFQWlCRTtJQUNFLFVBQUE7SUFDQSxnQkFBQTtFQWZKO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC91c2VyLWxvZ2luLWZvcm0vdXNlci1sb2dpbi1mb3JtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29sb3IgcGFsZXR0ZVxyXG4kcHJpbWFyeS1jb2xvcjogIzYyMDBlYTtcclxuJHNlY29uZGFyeS1jb2xvcjogIzAzZGFjNjtcclxuJGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiR0ZXh0LWNvbG9yOiAjMzMzO1xyXG4kYnV0dG9uLWNvbG9yOiAjNjIwMGVhO1xyXG4kYnV0dG9uLWhvdmVyLWNvbG9yOiBkYXJrZW4oJGJ1dHRvbi1jb2xvciwgMTAlKTtcclxuJGJvcmRlci1yYWRpdXM6IDhweDtcclxuXHJcbi8vIEdsb2JhbCBzdHlsZXMgZm9yIHRoZSBsb2dpblxyXG5idXR0b24ge1xyXG4gICAgXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYnV0dG9uLWNvbG9yO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXM7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJ1dHRvbi1ob3Zlci1jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAmOmZvY3VzIHtcclxuICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IGxpZ2h0ZW4oJGJ1dHRvbi1jb2xvciwgMzAlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4vLyBSZXNwb25zaXZlIGRlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAud2VsY29tZS1wYWdlIHtcclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgIG1hcmdpbjogMC41cmVtIDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserLoginFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-user-login-form',
                templateUrl: './user-login-form.component.html',
                styleUrls: ['./user-login-form.component.scss']
            }]
    }], function () { return [{ type: _fetch_api_data_service__WEBPACK_IMPORTED_MODULE_1__["MovieAPIService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }]; }, { userData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "trEW":
/*!*******************************************!*\
  !*** ./src/app/fetch-api-data.service.ts ***!
  \*******************************************/
/*! exports provided: MovieAPIService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieAPIService", function() { return MovieAPIService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/internal/operators */ "yrbL");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");







//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/';
class MovieAPIService {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(http) {
        this.http = http;
    }
    // Making the api call for the user registration endpoint
    userRegistration(userDetails) {
        return this.http.post(apiUrl + 'users/', userDetails).pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the user login endpoint
    userLogin(loginDetails) {
        return this.http.post(apiUrl + 'login/', loginDetails).pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the get all movies endpoint
    getAllMovies() {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies', { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the get one movie endpoint
    getOneMovie(movieTitle) {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + movieTitle, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the get director endpoint
    getDirector(directorName) {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/directors/' + directorName, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the get genre endpoint
    getGenre(genreName) {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genres/' + genreName, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the get user endpoint
    getUser(userName) {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + userName, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the add a movie to favorite movies endpoint
    addFavoriteMovies(movie, movieID, userName) {
        const token = localStorage.getItem('token');
        return this.http.post(apiUrl + 'users/' + userName + '/movies/' + movieID, movie, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the edit user endpoint
    editUser(userName, Password, Email, Birthday) {
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + userName, { Username: userName, Password, Email, Birthday }, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the delete user endpoint
    deleteUser(userName) {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + userName, { responseType: "text", headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Making the api call for the delete a movie from the favorite movies endpoint
    deleteMovie(movieID, userName) {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + userName + '/movies/' + movieID, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                Authorization: 'Bearer ' + token,
            }) }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(this.extractResponseData), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError));
    }
    ;
    // Non-typed response extraction
    extractResponseData(res) {
        const body = res;
        return body || {};
    }
    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        }
        else {
            console.error(`Error Status code ${error.status}, ` +
                `Error body is: ${JSON.stringify(error)}`);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Something bad happened; please try again later.');
    }
}
MovieAPIService.ɵfac = function MovieAPIService_Factory(t) { return new (t || MovieAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
MovieAPIService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MovieAPIService, factory: MovieAPIService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MovieAPIService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map