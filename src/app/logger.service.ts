import { Injectable } from '@angular/core';

@Injectable()
// {
// // providedIn: 'root',
// // when we try to remove this provided in property we will get an exception
// }
export class LoggerService {
  constructor() {}
  Log(msg: string) {
    console.log(msg);
  }
}
