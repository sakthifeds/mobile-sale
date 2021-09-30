import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { AppConfig } from '../../settings/app.config'

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.scss']
})
export class AdminproductComponent implements OnInit {

  constructor(private http: HttpClient,
    private appConfig:AppConfig,
    private router:Router) {} 

  showNewProducts:boolean = true;
  showViewProducts:boolean =false;
  ngOnInit(): void {
  }

  addNewProducts(){
    this.showNewProducts =true;
    this.showViewProducts = false;
  }

  viewProducts(){
    this.showViewProducts = true;
    this.showNewProducts = false;
  }

  onSubmit(productForm:NgForm){
    console.log('new Product data',productForm);
 
    const apiURL = `${this.appConfig.apiEndpoint}${this.appConfig.API_PRODUCT_LIST_PATH}`;
   this.http.post<any>(apiURL, productForm.value)
   .subscribe (res=>{
      console.log("res-post"+res)
    //  productForm.reset();
     // this.savedStatus = res.success;
    });
  }
}
