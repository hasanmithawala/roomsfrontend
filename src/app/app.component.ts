import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './rooms/localstorage.token';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = 'Admin';
  constructor(
    @Optional() private logger: LoggerService,
    @Inject(LocalStorageToken) private storage: Storage
  ) {
    // optional will not throw an error if there is an instance is available is okay if doesnt then execute it
  }
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  // vcr is a variable type is viewcontainerref
  // it will give us some reference
  // to what #user is also calleld template reference when yu define html tag with # you can acccess thay tag inside ts file using viewchild
  // viewcontainerref will actually help us to dynamically load a component
  ngAfterViewInit(): void {
    const ref = this.vcr.createComponent(RoomsComponent);
    ref.instance.NumberofRooms = 50;
    // you can also change property also
  }

  @ViewChild('name', { static: true }) name!: ElementRef;
  ngOnInit(): void {
    this.logger.Log('logger service');
    this.name.nativeElement.innerText = 'Rameshwaram Hotel';
    this.storage.setItem('name', 'Rameshwaram Hotel');
  }
}
