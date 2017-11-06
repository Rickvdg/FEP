import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message = '';

  constructor(public auth: AuthenticationService) {}

  login() {
    console.log('login');
    this.auth.googleLogin();
    this.message = '';
  }

  logout() {
    console.log('logout');
    this.auth.logout();
    this.message = '';
  }

  getPhotoURL() {
    this.auth.getPhotoURL();
  }

  ngOnInit() {
  }

}
