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

  @Input() userData = { username: '', password: ''};

constructor(
    public movieApiData: MovieAPIService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
    this.movieApiData.userLogin(this.userData).subscribe((result) => {
  // Logic for a successful user login goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result);
     this.snackBar.open(`Login successful! Welcome ${result.user.username}`, 'OK', {
        duration: 2000
     });
    
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        this.router.navigate(['/movies']);
      };
  
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
