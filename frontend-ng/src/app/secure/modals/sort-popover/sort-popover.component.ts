import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonRadioGroup, ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sort-popover',
  templateUrl: './sort-popover.component.html',
  styleUrls: ['./sort-popover.component.scss'],
})
export class SortPopoverComponent implements OnInit {

  @ViewChild('radioGroup') radioGroup: IonRadioGroup;
  @Input() sortBy: string;
  @Output() sortValue = new EventEmitter<string>();
  constructor(private popover: PopoverController) { }

  ngOnInit() {}

  sort(event) {
    // this.popover.dismiss(event);
  }

}
