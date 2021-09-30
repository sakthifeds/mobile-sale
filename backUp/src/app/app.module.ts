import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';

import { AdminModule } from './admin/admin.module'
@NgModule({
  declarations: [
    AppComponent,
    RegisterpageComponent,
    HomepageComponent,
    HeaderComponent,
    LoginComponent,
    
    AdmindashboardComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
