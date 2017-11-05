import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./authentication.service";
import { AuthGuardService } from './auth-guard.service';
import {BasketConfirmationDialog, CatalogComponent} from './catalog/catalog.component';
import { ReservationsComponent } from './reservations/reservations.component';
import {AngularFireModule} from "angularfire2";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuardService]},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]

export const firebaseConfig = {
  apiKey: "AIzaSyAiOOWusTDxJCv8IdUn6qpv8_fN2GJM3yE",
  authDomain: "fep-eindopdracht.firebaseapp.com",
  databaseURL: "https://fep-eindopdracht.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "260632233773"
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    CatalogComponent,
    ReservationsComponent,
    BasketConfirmationDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    LoginModule,
    NgbModule.forRoot(),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule, ReactiveFormsModule
  ],
  entryComponents: [
    BasketConfirmationDialog
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
