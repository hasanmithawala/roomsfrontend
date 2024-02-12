import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
  ViewChild,
  Host,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [RoomsService],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  constructor(@Host() private roomservice: RoomsService) {
    // all the component that is available inside this conatiner component will start using this instance of roomservice
    console.log(roomservice);
  }
  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.employee.name = 'H.M.';
  }
}
