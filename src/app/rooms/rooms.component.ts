import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
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

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  hotelName: string = 'Rameshwaram Hotel';
  NumberofRooms: number = 10;
  hideRooms: boolean = false;
  selectedRoom!: RoomsList;
  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };
  title = 'Room List';
  roomList: RoomsList[] = [];

  @ViewChild(HeaderComponent, { static: true })
  // when we make this property as static:true this component is actually safe to be used inside oninit of its parent
  headerComponent!: HeaderComponent;
  // we have created here is the new instance of the this headercomponent and we can access this instance inside this component we can access this instance insie this component
  // we can access any property any method of  header component inside this component
  // lifecycle hooks will run for each and every component for eg ngoninit in rooms component will be called in this component same way for each and every component their individual ngoninit will be called
  // viewchild will only access first instance of the property which is available in the instance
  // if we want ot access all the isntance which is available in the header componet you can use viewChildren
  // anf viewchildren doesnt have staic property also
  // viewchildren by deafult  static property is by deafult false
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;
  constructor(@SkipSelf() private roomservice: RoomsService) {
    // if the roomservice is public then it can also be accessed in the html template should not access services from the template
  }
  ngOnInit(): void {
    // console.log(this.roomservice.getRooms());
    this.roomservice.getRooms().subscribe((rooms) => {
      this.roomList = rooms;
    });
  }
  ngDoCheck(): void {
    console.log('onchanges is called');
    // this sill run or executes everytime you raised any events irrepective of where this component is implemented or avialable in case it is active it will listen to any changes
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
      roomNumber: '4',
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
    this.roomList = [...this.roomList, room];
  }
}
