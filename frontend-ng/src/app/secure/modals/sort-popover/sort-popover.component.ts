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
  constructor(private popoverController: PopoverController) { }

  sortMode = "";
  ngOnInit() {
    console.log(this.sortBy);
    this.sortMode = this.sortBy;
  }

  radioGroupChange(event: any) {
    let viewChanged = event.detail;
    this.sortMode = this.radioGroup.value;
    this.popoverController.dismiss(viewChanged);
  }

}
