import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { AppConfig } from '../settings/app.config';
import { MessageService } from '../services/message.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categoryId:string='';
  constructor(private http: HttpClient,
    private appConfig:AppConfig,
    private router:Router,private messageService:MessageService,
    private apiService:ApiService) {} 

  getCategory(category:string){
    console.log('Categoryname',category);
    let catId:string = category;
    localStorage.setItem('catId',catId)
    const params = new HttpParams()
      .set('categories', catId)
    //Get PRODUCTS
    this.apiService.getproducts(params).subscribe(data=>{
      this.messageService.sendMessage(data);
    })
  }

  ngOnInit(): void {

  }

}
