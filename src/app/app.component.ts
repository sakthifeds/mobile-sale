import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { MessageService } from './services/message.service';

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
  
  enableLoader = true;
  title = 'mobile-sale';
  savedStatus:any;
  public items:any;
  baseURL = "http://localhost:3000/"
  constructor(private http: HttpClient,
    private messageService:MessageService) {
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

      this.messageService.enableLoader.subscribe(data=>{
        this.enableLoader = data
      })

  
    
  }

   showPreview(event:any){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      console.log('src',src)
      var preview = document.getElementById("file-ip-1-preview");
    
    }
  }
}
