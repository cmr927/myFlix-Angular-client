import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLoggedOut (): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  isLoggedIn (): boolean {
    if (!localStorage.getItem("token")){
      return false
    }
    else {
      return true
    }
      

}}
