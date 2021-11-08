import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('showHideRotatedState', [
        state('isOpen', style({ transform: 'rotate(0)' })),
        state('isClosed', style({ transform: 'rotate(180deg)' })),
        transition('isOpen => isClosed', animate('300ms ease-out')),
        transition('isClosed => isOpen', animate('300ms ease-in'))
    ])
]
})
export class ProfilePage implements OnInit {

  public openState = 'isOpen';

  constructor() { }

  ngOnInit() {

  }

  public hideOverview(e: Event): void {
    // Toggle UI
    if (this.openState === 'isOpen') {
        this.openState = 'isClosed';
    } else {
        this.openState = 'isOpen';
    }
}

}
