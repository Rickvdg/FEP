import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./authentication.service";
import { AuthGuardService } from './auth-guard.service';
import { CatalogComponent, BasketQtyDialog } from './catalog/catalog.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { CustomDatePipe } from './reservations/custom-date.pipe';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuardService]},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardService]},
  { path: 'products', component: CatalogProductComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

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
    CustomDatePipe,
    BasketQtyDialog,
    ReservationsComponent,
    CatalogProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    LoginModule,
    NgbModule.forRoot(),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  entryComponents: [
    BasketQtyDialog,
    MatButtonModule, MatCheckboxModule, MatDialogModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatDatepickerModule, MatNativeDateModule,
  ],
  entryComponents: [
    BasketQtyDialog
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
