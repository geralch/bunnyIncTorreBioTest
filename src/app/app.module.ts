import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxLinkedinModule } from 'ngx-linkedin';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:torreBioId', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLinkedinModule.forRoot({
      clientId: '78cbgwouwemnh6'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
