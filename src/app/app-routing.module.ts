import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { HomepageComponent } from './homepage/homepage.component'
import { RegisterpageComponent } from './registerpage/registerpage.component'
import { LoginComponent } from './login/login.component'
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component'
import { ProductlistComponent} from './productlist/productlist.component';
import { CartpageComponent } from './cartpage/cartpage.component'
const routes: Routes = [
  {                                       
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },{
     path: 'home',
     component: HomepageComponent
  },
  { path: "register", component: RegisterpageComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'displayproducts',
    component: ProductlistComponent
  },
  {
    path:'cartpage',
    component:CartpageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
