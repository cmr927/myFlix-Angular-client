import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { MovieAPIService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    /**
   * An object to capture the user's registration details.
   * @property {string} Username - The desired username of the new user.
   * @property {string} Password - The desired password of the new user.
   * @property {string} Email - The email address of the new user.
   * @property {string} Birthday - The birthday of the new user.
   */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  /**
   * 
   * @param movieApiData - An instance of MovieAPIService to handle API calls.
   * @param dialogRef - A reference to the dialog opened for this component.
   * @param snackBar - An instance of MatSnackBar to display notifications.
   */

constructor(
    public movieApiData: MovieAPIService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

 /**
   * Angular lifecycle hook that runs after component initialization.
   */    
ngOnInit(): void {
}

  /**
   * This method sends the registration form data to the backend and handles the response.
   * On successful registration, the dialog closes, and a success message is shown.
   * On failure, an error message is displayed.
   */
registerUser(): void {
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

