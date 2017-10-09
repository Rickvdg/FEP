import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthenticationService) {}

  login() {
    console.log('login');
    this.auth.googleLogin();
  }

  logout() {
    console.log('logout');
    this.auth.logout();
  }

  getPhotoURL() {
    this.auth.getPhotoURL();
  }

  ngOnInit() {
  }

}
