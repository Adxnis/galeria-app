import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup, PopoverController } from '@ionic/angular';

////////////////////////////////
////// This component handles the sorting of photos and albums
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
    this.sortMode = this.sortBy;
  }

  radioGroupChange(event: any) {
    let viewChanged = event.detail;
    this.sortMode = this.radioGroup.value;
    this.popoverController.dismiss(viewChanged);
  }

}
