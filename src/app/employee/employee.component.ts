import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  name: string = 'hasan';
  // constructor(@Self() private roomservice: RoomsService) {
  //   // by using this self decorator we are saying that that this particular service should be available at this level if this particualr service is not available at this level here it means we should throw an exception.
  // }
  constructor(private roomservice: RoomsService) {}

  ngOnInit(): void {}
}
