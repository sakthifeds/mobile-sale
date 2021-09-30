import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { AppConfig } from '../settings/app.config';
import { MessageService } from './message.service';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  messages: string[] = [];
  private alertmsg = new BehaviorSubject<any>({});
  private keepAfterNavigationChange = false;
  constructor(private http: HttpClient,
    private appConfig:AppConfig,
    private router:Router,private messageService:MessageService) {
    // clear alert message on route change
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterNavigationChange) {
                // only keep for a single location change
                this.keepAfterNavigationChange = false;
            } else {
                // clear alert
                this.alertmsg.next({});
            }
        }
    });
  }


  private bhSubject = new BehaviorSubject<any>('');
  public loginStatus = new BehaviorSubject<Boolean>(false)


  getproducts(params:any):Observable<any>{
    const apiURL = `${this.appConfig.apiEndpoint}${this.appConfig.API_PRODUCT_LIST_PATH}`;
    return this.http.get<any>(apiURL,{params})
     .pipe(map(res=>{
        console.log("apiService-Get PRODUCTS"+res);
     //   this.messageService.sendMessage(res);
        return res;
      
     }));


  }


}
