import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';

interface cust {
  "message":string;
  "data":[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  
  title = 'mobile-sale';
  savedStatus:any;
  public items:any;
  baseURL = "http://localhost:3000/"
  constructor(private http: HttpClient) {
  }

  onSubmit(contactForm:NgForm) {
      console.log(contactForm.value);
      this.http.post(this.baseURL + 'api/posts', contactForm.value).subscribe (res=>{
        console.log('res-post'+res)
        this.savedStatus = (res as any).message;
      });
    };

    getData(){
     
      this.http.get<cust>(this.baseURL + 'api/posts').subscribe (res=>{
        console.log('res-getData'+ JSON.stringify(res));
       // this.items = (res as any).data;
        this.items = res.data;
        console.log('items'+this.items);
      });
    }

  ngOnInit(){
   
      //  this.http.get(this.baseURL + 'api/posts').subscribe (res=>{
      //    console.log('res'+res)
      //  });

  
    
  }
}
