import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoadingInterceptor } from './services/loading.interceptor';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';

import { AdminModule } from './admin/admin.module';
import { ProductlistComponent } from './productlist/productlist.component';
import { CartpageComponent } from './cartpage/cartpage.component'
@NgModule({
  declarations: [
    AppComponent,
    RegisterpageComponent,
    HomepageComponent,
    HeaderComponent,
    LoginComponent,
    
    AdmindashboardComponent,
         ProductlistComponent,
         CartpageComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
    AdminModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
