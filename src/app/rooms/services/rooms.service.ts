import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../rooms';
import { environment } from '../../../environments/environment';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { Appconfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomsList[] = [];
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndPoint);
    console.log('Rooms Service is intialized');
    console.log(environment.apiEndPoint);
  }
  getRooms() {
    return this.http.get<RoomsList[]>('/api/rooms');
    // whatever data i am getting just transform that data into RoomsList array
  }
}
