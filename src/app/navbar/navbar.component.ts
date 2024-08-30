import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    /**
   * Creates an instance of NavbarComponent.
   */

  constructor() { }

    /**
   * Angular lifecycle hook that runs after component initialization.
   */

  ngOnInit(): void {
  }

    /**
   * Logs out the user by removing the token and user data from local storage.
   */

  onLoggedOut (): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  /**
   * Checks if the user is currently logged in by verifying if a token exists in local storage.
   * @returns A boolean indicating whether the user is logged in.
   */
  isLoggedIn (): boolean {
    if (!localStorage.getItem("token")){
      return false
    }
    else {
      return true
    }
      

}}
