import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  private loggedIn = false;
  private displayName = '';
  private displayPhotoURL = '';
  private email = '';
  public errorMessage = '';

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.loggedIn = false;
          this.displayName = '';
          this.displayPhotoURL = '';
          this.email = '';
        } else {
          this.loggedIn = true;
          this.displayName = auth.displayName;
          this.displayPhotoURL = auth.photoURL;
          this.email = auth.email;
          this.errorMessage = '';
          console.log('Auth: ' + auth);
        }
      }
    );
  }

  googleLogin() {
    console.log('Google login..');
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getDisplayName() {
    return this.displayName;
  }

  getPhotoURL() {
    return this.displayPhotoURL;
  }

  getEmail() {
    return this.email;
  }
}
