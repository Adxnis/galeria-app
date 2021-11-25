import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// header tabs
enum Tabs {
  albums,
  photos,
  shared
}

////////////////////////////////
// Home tabs in header

@Component({
  selector: 'app-hometabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss'],
})
export class HometabsComponent implements OnInit {


  // send data to header component to set active tab
  @Output() buttonSetActive = new EventEmitter<string>();
  
  // default active tab is albums
  public isActive: Tabs = Tabs.albums;
	public readonly tabs = Tabs;
  constructor() { }

  // set default active tab for
  ngOnInit() {
    this.isActive = Tabs.albums;
  }

  // select active tab and emit value to switch to that active tab
  goTo(tab: string) {
    switch(tab) {
      case 'albums':
        this.isActive = Tabs.albums;
        this.buttonSetActive.emit(tab);
        break;
      case 'photos':
        this.isActive = Tabs.photos;
        this.buttonSetActive.emit(tab);
        break;
      case 'shared':
        this.isActive = Tabs.shared;
        this.buttonSetActive.emit(tab);
        break;
      default:
        break;
    }
  }
}
