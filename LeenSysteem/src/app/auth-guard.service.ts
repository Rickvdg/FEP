import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './login/login.component';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true; // continue to routed component
    } else {
      // Go to login page if the user is not logged in
      this.auth.errorMessage = 'You need to login to see this';
      this.router.navigate(['/login']);
      // abort current navigation
      return false;
    }
  }
}
