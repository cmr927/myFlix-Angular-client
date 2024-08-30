import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * @param dialog - An instance of MatDialog used to open dialogs.
   */
  constructor(public dialog: MatDialog) { }
  /**
   * Angular lifecycle hook that runs after component initialization.
   */
  ngOnInit(): void {
  }

   /**
   * Opens the user registration dialog when the signup button is clicked.
   * The dialog opens with a specified width of 280px.
   */  
openUserRegistrationDialog(): void {
  this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
  width: '280px'
  });
};

/**
   * Opens the user login dialog when the login button is clicked.
   * The dialog opens with a specified width of 280px.
   */
openUserLoginDialog(): void {
this.dialog.open(UserLoginFormComponent, {
width: '280px'
});
};

}