import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Rooms, RoomsList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName: string = 'Rameshwaram Hotel';
  NumberofRooms: number = 10;
  hideRooms: boolean = true;
  totalBytes = 0;
  subscription!: Subscription;
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();
  // i am going to subscribe to this is an active stream
  // subject is a type provided by RXJS that acts both as observable and an observer
  // <string> specifies the type of values that this subject will emit, indicating that it will emit strings.
  // Subject is a type typically used in Reactive Programming libraries like RxJS. It represents an object that is both an observable and an observer. It can emit values to its subscribers, and it can also be subscribed to, to receive values.
  // this is a error stream which will act as both observer and observable
  selectedRoom!: RoomsList;
  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };
  title = 'Room List';
  roomList: RoomsList[] = [];
  stream = new Observable<string>((observer) => {
    //
    // now we can subscribe to this observer which can give new stream everytime you are calling this stream
    // one thing is observable in which your user will subscribe to and internally observable will have observer which will observe the data if there is a new value which is available
    // where this is useful lets say you are working with real time database whenever a new value is pushed because its a pushed based architecture your observer will observe there is a new value what i have to is i have to call next()
    // this particular will have string of data
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('');
    // whenver you call your next on your observable it will be emitting a new data
    // when you call a complete method it means the observer is completed
  });
  @ViewChild(HeaderComponent, { static: true })
  // when we make this property as static:true this component is actually safe to be used inside oninit of its parent
  headerComponent!: HeaderComponent;
  // we have created here is the new instance of the this headercomponent and we can access this instance inside this component we can access this instance insie this component
  // we can access any property any method of  header component inside this component
  // lifecycle hooks will run for each and every component for eg ngoninit in rooms component will be called in this component same way for each and every component their individual ngoninit will be called
  // viewchild will only access first instance of the property which is available in the instance
  // if we want ot access all the isntance which is available in the header componet you can use viewChildren
  // any viewchildren doesnt have static property also
  // viewchildren by default  static property is by default false
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;
  constructor(@SkipSelf() private roomservice: RoomsService) {
    // if the roomservice is public then it can also be accessed in the html template should not access services from the template
  }
  rooms$ = this.roomservice.getRooms$.pipe(
    catchError((error) => {
      // just log the error and just return the empty array in case of error just return the empty array
      // when we use any operators use inside the pipe
      this.error$.next(error.message);
      // whenever there is an error which is raised i am going to push the error in to the observable stream and subscriber can get that error message
      //whenever you call next your changedetection is going to run again so you should not write the code in the component you can move it to service or another common place you want it to
      // what we are doing whenever there is an exception now we are handling that error and subscribing to the error$
      return of([]);
    })
  );
  roomsCount$ = this.roomservice.getRooms$.pipe(map((rooms) => rooms.length));
  // here we are just modifying the stream map is used to tranform the data
  ngOnInit(): void {
    // console.log(this.roomservice.getRooms());
    this.roomservice.getPhotos().subscribe((event) => {
      //  subscribe to multiple events
      // new httprequest comes with this types of events
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          // resposne header doesnt contain actual data but only contain metadata about server and all that stuff it's like receiving a note on the outside of the package that tells you some basic information about what's inside, like who sent it, how big it is, and what type of content it contains
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          // as data is big download progress means how many bytes of data is loaded
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          // the actual reposne with data comes here
          console.log(event.body);
        }
      }
    });
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));
    // this.subscription = this.roomservice.getRooms$.subscribe((rooms) => {
    //   // here we are caching the request
    //   // you also want to unsubsribe the data when you are manually subscribing so you have to unsubscribe whenever dont need that to manually and if not it leads to peformance issues so there are alternatives to this also like async pipe etc
    //   this.roomList = rooms;
    // });
  }
  ngDoCheck(): void {
    console.log('onchanges is called');
    // this sill run or executes everytime you raised any events irrepective of where this component is implemented or available in case it is active it will listen to any changes
  }
  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    console.log((this.headerChildrenComponent.last.title = 'Hello world'));
    console.log(this.headerChildrenComponent.get(2));
  }
  ngAfterViewChecked(): void {}
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }
  selectRoom(room: RoomsList) {
    // the child event sending me the type of this data of RoomList
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomsList = {
      // roomNumber: '4',
      roomType: 'Deluxe room',
      amenities: 'Air Conditioner,Free Wifi',
      price: 500,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    // this.roomList.push(room);
    this.roomservice.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  editRoom() {
    const room: RoomsList = {
      roomNumber: '3',
      roomType: 'Deluxe room',
      amenities: 'Air Conditioner,Free Wifi',
      price: 500,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    this.roomservice.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  deleteRoom() {
    this.roomservice.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      // if any subscription is active then unsubscribe to it thats the meaniing of the above code
      this.subscription.unsubscribe();
    }
  }
}
