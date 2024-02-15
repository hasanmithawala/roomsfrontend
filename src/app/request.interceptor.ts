import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  // HTTPINTERCEPTOR CAN MODIFY YOUR REQUEST AS WELL AS IT CAN MODIFY YOUR RESPOSNE ALSO IN CASE YOU NEED IT

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    return next.handle(request);
    // this line actually sends the request to your server if you dont call this method nothing will happen
  }
}
