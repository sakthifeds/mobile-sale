import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AppConfig } from '../settings/app.config';
import { MessageService } from '../services/message.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin, Observable,of } from 'rxjs';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {


   data:Observable<any> = of(1,2,3,4);
  productList:any;
  constructor(private http: HttpClient,
    private appConfig:AppConfig,
    private router:Router,private messageService:MessageService) {} 

  ngOnInit(): void {
    
    this.messageService.getMessage().subscribe(data=>{
      console.log("productdata",data);
      this.productList = data;
    
    })
     
    forkJoin(
      [this.http.get('https://jsonplaceholder.typicode.com/posts'),
       this.http.get('https://jsonplaceholder.typicode.com/users'),
       this.data
    ])
    .subscribe(res=>{
      console.log('forJOin',res);
    }
    )
    
    let catId = localStorage.getItem('catId') || '';
    console.log('ngonIt',catId);
    const params = new HttpParams()
    .set('categories', catId)
 
    const apiURL = `${this.appConfig.apiEndpoint}${this.appConfig.API_PRODUCT_LIST_PATH}`;
   this.http.get(apiURL,{params})
    .subscribe (res => {
       console.log("res-post"+res);
       this.productList = res;
     //  this.messageService.sendMessage(res);
     
     });
  
   
  }

  addToCart(data:any){
    console.log('addTocartData',data);
    this.messageService.loginStatus.subscribe(userLoggedIn =>{
      console.log('userLoggedin',userLoggedIn);
      if(userLoggedIn){
        const apiURL = `${this.appConfig.apiEndpoint}${this.appConfig.API_PRODUCT_LIST_PATH}/addToCart/`+data;
        let obj ={
          "addedToCart":true
        }
        this.http.put<any>(apiURL, obj)
        .subscribe (res=>{
           console.log("res-put"+res) ;
           alert('Added to Cart Successfully')
        });
      }else{
        this.router.navigateByUrl('/login');
      }
      
    })
  }
}
