import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import {AdmindashboardComponent } from './admindashboard/admindashboard.component'
import {AdminproductComponent} from './adminproduct/adminproduct.component'
import {AdminorderComponent} from './adminorder/adminorder.component'
const routes: Routes = [
    {                                       
      path: 'admin',
      component: AdmindashboardComponent,
      children: [
    {
       path: 'products',
       component: AdminproductComponent
    },
    {
        path: 'orders',
        component: AdminorderComponent
     }
      ]
    }
  ];

@NgModule({
  declarations: [
    AdminproductComponent,
    AdminorderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [],

})
export class AdminModule { }
