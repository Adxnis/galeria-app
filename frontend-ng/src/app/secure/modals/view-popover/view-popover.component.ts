import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRadio, IonRadioGroup, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-view-popover',
  templateUrl: './view-popover.component.html',
  styleUrls: ['./view-popover.component.scss'],
})
export class ViewPopoverComponent implements OnInit {
  @ViewChild('radioGroup') radioGroup: IonRadioGroup;
  @Input() currentView: string;

  viewMode = "";
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.viewMode = this.currentView;
  }

  radioGroupChange(event: any) {
    let viewChanged = event.detail;
    this.viewMode = this.radioGroup.value;
    this.popoverController.dismiss(viewChanged);
  }
}
