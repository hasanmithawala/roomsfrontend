import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { RoomsList } from '../rooms';
@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // requirements for onpush
  // onpush changedetection stratergy can be only be applied in case i am not modifying some data internally in  this component
  // how can i acheive it by using input and output
  // so basically it relies on data which is not internally it means data is coming from parent basically data is being imported here the data is not used internallly here.
  // it relies on data which is outside and doesnt rely on internal data
  // it doesnt change the data internally thats why we can use onpush
  // so we going to apply it on roomslist component or in this component beacuse it uses input and output it doesnt chnage the data internally it relies data which is coming from outside it always knows data is getting changed
  // With ChangeDetectionStrategy.OnPush, Angular triggers change detection for a component only when its input properties change by reference. If the reference to an input property remains the same, Angular won't perform change detection for that component, even if the properties of the object itself have changed.
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomsList[] | null = [];
  @Input() title: string = '';

  // Output are actually an events
  @Output() roomSelected = new EventEmitter<RoomsList>();
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    // In summary, ngOnChanges is specifically designed to handle changes in input properties and does not apply to output properties. It's an important tool for reacting to changes in input data passed from parent components to child components.
    //When using ChangeDetectionStrategy.OnPush, Angular triggers change detection for a component only if the conditions for ChangeDetectionStrategy.OnPush are met. If those conditions are not met (i.e., the references to input properties have not changed), Angular won't trigger change detection, and consequently, the ngOnChanges hook won't be invoked.
    // this will also run on intilization
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
  ngOnDestroy(): void {
    // whenever compoenent is removed from the dom then ngondestroy will be called
    console.log('on destroy is called');
  }
  selectroom(room: RoomsList) {
    // roomselected variable will emit this room object of type Roomlist
    // this room data will get back to the parent component
    this.roomSelected.emit(room);
  }
}
