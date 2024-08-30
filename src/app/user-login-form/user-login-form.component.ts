import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { MovieAPIService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import is used to route
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

/**
  * An object to capture the user's login credentials.
  * @property {string} username - The user's username.
  * @property {string} password - The user's password.
*/

  @Input() userData = { username: '', password: ''};

  /**
    * @param movieApiData - An instance of MovieAPIService to handle API calls.
    * @param dialogRef - A reference to the dialog opened for this component.
    * @param snackBar - An instance of MatSnackBar to display notifications.
    * @param router - An instance of Router to handle navigation.
   */

constructor(
    public movieApiData: MovieAPIService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
) { }

/**
  * Angular lifecycle hook that runs after component initialization.
*/

ngOnInit(): void {
}

/**
  * This method sends the login form data to the backend and handles the response.
  * On successful login, the dialog closes, a success message is shown, and the user is redirected.
  * On failure, an error message is displayed.
*/
loginUser(): void {
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
      };
  
    }, 

    /**
     * If the login fails 
     * @param result 
     */

    (result) => {
      console.log(result);
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
      
    });
   
  }

  }
