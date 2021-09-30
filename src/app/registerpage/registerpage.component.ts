import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { AppConfig } from '../settings/app.config';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {

  
  savedStatus:boolean =false;

  constructor(private http: HttpClient,
              private appConfig:AppConfig,
              private router:Router) {} 

  onSubmit(contactForm:NgForm) {
    console.log('contactForm',contactForm.value);
  const apiURL = `${this.appConfig.apiEndpoint}${this.appConfig.API_REGISTER_PATH}`;
   this.http.post<any>(apiURL, contactForm.value)
   .subscribe (res=>{
      console.log("res-post"+res)
      contactForm.reset();
      this.savedStatus = res.success;
    });
  };

  gotoLogin(){
    this.router.navigateByUrl('/login')
  }

  
  ngOnInit(): void {
  }

}
