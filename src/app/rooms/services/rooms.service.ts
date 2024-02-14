import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../rooms';
import { environment } from '../../../environments/environment';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { Appconfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomsList[] = [];
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) {
    // console.log(this.config.apiEndPoint);
    // console.log('Rooms Service is intialized');
    // console.log(environment.apiEndPoint);
  }
  getRooms$ = this.http.get<RoomsList[]>('/api/rooms').pipe(
    shareReplay(1)
    // we have to modify the stream or filtered something before subscribing the data here what it does
    // we are going repeat or replay the last 1 record we have recieved
    // Sharing the Subscription: By sharing the observable's subscription among multiple subscribers, shareReplay ensures that there's only one underlying subscription to the observable, regardless of how many times it's subscribed to. This prevents redundant requests or computations by allowing multiple subscribers to share the same stream of data.

    // Replaying Values: Additionally, shareReplay replays the last emitted value (or a specified number of previous values) to new subscribers. This means that new subscribers don't trigger additional side effects or redundant requests, as they immediately receive the last emitted value without re-executing the observable's source.
  );
  // we cannot modify the stream after we have subscribe to it stream can be modified inside a function that function is known as pipe
  getRooms() {
    return this.http.get<RoomsList[]>('/api/rooms');
    // whatever data i am getting just transform that data into RoomsList array
  }
  addRoom(room: RoomsList) {
    return this.http.post<RoomsList[]>('/api/rooms', room);
    // after adding the latest  record give me the all the data
  }
  editRoom(room: RoomsList) {
    return this.http.put<RoomsList[]>(`/api/rooms/${room.roomNumber}`, room);
    // this is the type of response i am getting RoomList type of response i am getting entire roomlist will be responsded when making an api call
  }
  delete(id: string) {
    return this.http.delete<RoomsList[]>(`/api/rooms/${id}`);
  }
  getPhotos() {
    // what you can achieve using this if you have an api that takes some time to load data and you have lot of records to display
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
    // it is requesting to the above specified url
  }
}
