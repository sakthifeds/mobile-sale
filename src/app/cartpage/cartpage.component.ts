import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { AppConfig } from '../settings/app.config';
import { MessageService } from '../services/message.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss']
})
export class CartpageComponent implements OnInit {

  cartData:any;
  constructor(private http: HttpClient,
    private appConfig:AppConfig,
    private router:Router,private messageService:MessageService,
    private apiService:ApiService) {} 

  ngOnInit(): void {
    alert('1');
    const params = new HttpParams()
    .set('categories', 'HOME')
  //Get PRODUCTS
  this.apiService.getproducts(params).subscribe((data:any)=>{
   this.cartData = data.filter((data:any) => data.addedToCart == true)
    console.log('CartData to be Displayed',   this.cartData);
  })
  }

}
