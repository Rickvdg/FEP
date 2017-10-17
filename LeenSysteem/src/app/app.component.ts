import { Component } from '@angular/core';
import { AuthenticationService } from "./authentication.service";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeenSysteem';
  items: FirebaseListObservable<any[]>;

  constructor(
    public auth: AuthenticationService,
    public database: AngularFireDatabase
  ) {
    this.items = database.list('/leningen-test');
  }

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

  addLening(newLening: string) {
    this.items.push({ lening: newLening });
  }
}

