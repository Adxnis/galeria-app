import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup, PopoverController } from '@ionic/angular';

////////////////////////////////
////// This component handles the view of photos and albums
@Component({
  selector: 'app-view-popover',
  templateUrl: './view-popover.component.html',
  styleUrls: ['./view-popover.component.scss'],
})
export class ViewPopoverComponent implements OnInit {

  @ViewChild('radioGroup') radioGroup: IonRadioGroup;
  
  // get current view from main page
  @Input() currentView: string;

  viewMode = "";
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.viewMode = this.currentView;
  }

  // send view mode back to main component 
  radioGroupChange(event: any) {
    let viewChanged = event.detail;
    this.viewMode = this.radioGroup.value;
    this.popoverController.dismiss(viewChanged);
  }
}
