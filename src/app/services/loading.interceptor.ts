import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, tap } from "rxjs/operators";
import {MessageService} from './message.service';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //return next.handle(request);
    return next.handle(request).pipe(
      tap(res => {
          if (res.type === HttpEventType.Sent) {
              this.loadingService.enableLoader.next(true);
              console.log('request sent');
          }

          if (res.type === HttpEventType.Response) {
              setTimeout(()=>{
                this.loadingService.enableLoader.next(false);
              },500);
              console.log('response received');
          }
      }),
      catchError((err:any)=>{
        console.log(err);
          return throwError('errror')
      })
  );
  }
}
