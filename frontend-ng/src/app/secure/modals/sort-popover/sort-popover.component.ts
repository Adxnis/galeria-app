import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sort-popover',
  templateUrl: './sort-popover.component.html',
  styleUrls: ['./sort-popover.component.scss'],
})
export class SortPopoverComponent implements OnInit {

  @Output() sortValue = new EventEmitter<string>();
  constructor(private popover: PopoverController) { }

  ngOnInit() {}

  sort(event) {
    // this.popover.dismiss(event);
  }

}
