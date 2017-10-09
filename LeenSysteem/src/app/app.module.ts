import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./authentication.service";

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    LoginModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthenticationService
    // AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
