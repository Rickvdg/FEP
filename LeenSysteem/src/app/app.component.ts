import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeenSysteem';

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

  getDisplayName() {
    this.auth.getDisplayName();
  }
}

