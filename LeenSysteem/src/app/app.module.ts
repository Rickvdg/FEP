import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
