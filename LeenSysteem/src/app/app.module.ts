import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./authentication.service";
import { AuthGuardService } from './auth-guard.service';
import { ProductService} from "./product/product.service";
import { CatalogComponent } from './catalog/catalog.component';
import { ReservationsComponent } from './reservations/reservations.component';
import {AngularFireModule} from "angularfire2";
import { CatalogProductComponent } from './catalog-product/catalog-product.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuardService]},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardService]},
  { path: 'products', component: CatalogProductComponent},
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
    CatalogProductComponent
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
    MatButtonModule, MatCheckboxModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
