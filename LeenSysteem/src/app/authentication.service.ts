import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  private loggedIn = false;
  private displayName = '';
  private displayPhotoURL = '';
  private email = '';
  private rol = '';
  public errorMessage = '';
  items: FirebaseListObservable<any[]>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {
    this.items = this.database.list('/admins', { preserveSnapshot: true});
    this.getRol();
    this.firebaseAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.loggedIn = false;
          this.displayName = '';
          this.displayPhotoURL = '';
          this.email = '';
          this.rol = '';
        } else {
          this.loggedIn = true;
          this.displayName = auth.displayName;
          this.displayPhotoURL = auth.photoURL;
          this.email = auth.email;
          this.getRolFromData();
          if (this.rol == '' || this.rol == null) {
            this.rol = 'user';
          }
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

  getRol() {
    return this.rol;
  }

  getRolFromData() {
    this.database.list('/admins', { preserveSnapshot: true})
      .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          if (this.email == snapshot.val().email) {
            this.rol = snapshot.val().rol;
          }
        });
      })
  }
}
