import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { AppConfig } from '../settings/app.config';
import { MessageService } from '../services/message.service';

import { of, forkJoin } from 'rxjs';
import { take, retry, map, mergeMap, switchMap,debounceTime } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, combineLatest, ReplaySubject, throwError, interval,fromEvent} from 'rxjs';

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
    private router:Router,
    private messageService:MessageService) {} 

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
          this.messageService.loginStatus.next(true);
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
//Fork Join

let list1 = new BehaviorSubject<any>('Rahim');
let list2 =  new BehaviorSubject<any>('tamil');

// let list1 = of(1,2,3,4)

// let list2 = of('A','B','C','D')

let final_val = forkJoin(
  [list1, 
   list2.pipe(throwError)
  // list2
  ]);
final_val.subscribe(
  val=> { console.log('forkJoin',val) },
  error => { console.log("error")},
  () => {console.log("Completed")}
)
  
list1.complete();
list2.complete();

//------------------------------------//

//Combinelatest +Take Operator
const stream1 = new BehaviorSubject(2);//DashboardData
const stream2 = new BehaviorSubject('two'); //OfferData

combineLatest([stream1.pipe(take(3)), stream2]).subscribe(
      data=> {
         console.log('Combinelatest',data);

    },
    error =>{
    //  console.log('combinelatest',error)
    }
    );

stream1.next(3);
stream2.next('three');

stream1.next(4);
stream2.next('four');
stream1.next(5);
stream2.next('five');
stream1.next(6);
stream2.next('six');
  
//--------------------------------------//

//Subject
const sub = new Subject();

sub.next(1);
sub.subscribe(x => {
//console.log('Subscriber A---', x);
});
sub.next(2); // OUTPUT => Subscriber A 2
sub.subscribe(x => {
 // console.log('Subscriber B---', x);
});
sub.next(3); 

//-----------------------------------------//


const repSubject = new ReplaySubject(2);

repSubject.next(1);
  repSubject.next(2);
  repSubject.subscribe(x=>console.log('replaySubject -A',x)); // OUTPUT => 1,2
  repSubject.next(3); // OUTPUT => 3
  repSubject.next(4); // OUTPUT => 4
repSubject.subscribe(x=>console.log('replaySubject + 3',x));  // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
repSubject.next(5);


//------------------------------------------//

//MergeMaP + Switchmap
of("hound", "mastiff", "retriever")        //outer observable
  .pipe(
    switchMap(breed => {
      const url = 'https://dog.ceo/api/breed/' + breed + '/list';
      return this.http.get<any>(url)       //inner observable   
    })
  )
  .subscribe(data => {
  //  console.log('mergeMap+ForkJoin',data)
  })


const clicks = fromEvent(document, 'click');
 
  clicks.pipe(debounceTime(1000)).
  subscribe(x => console.log('debouncetime',x));

  }
}