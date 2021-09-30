import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { AppConfig } from '../settings/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageToUser:string="";
  loginStatus:Boolean=false;
  isAdmin:Boolean =false;
  constructor(private http: HttpClient,
    private appConfig:AppConfig,
    private router:Router) {} 

  loginSubmit(loginData:NgForm){
    console.log(loginData);
    const apiURL = `${this.appConfig.apiEndpoint}${ this.appConfig.API_LOGIN_PATH}`;
     this.http.post<any>(apiURL, loginData.value)
     .subscribe (res=>{
        console.log("res-post"+res)
        loginData.reset();
        this.loginStatus = res.success;
        this.isAdmin =res.isAdmin;
        if(this.loginStatus){
          if(this.isAdmin){
            this.router.navigateByUrl('/admin')
          }else{
            this.router.navigateByUrl('/home')
          }
       
        }else{
          this.messageToUser = res.message;
        }
      
      });
    };
  
  ngOnInit(): void {
  }

}
