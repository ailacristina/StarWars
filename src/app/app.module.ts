import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

//Components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { FilmsComponent } from './components/films/films.component';

//Pages
import { HomePage } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PlanetsComponent,
    FilmsComponent,
    HomePage,
    LoginPageComponent,
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, HttpClientModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
