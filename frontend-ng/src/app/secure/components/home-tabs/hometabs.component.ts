import { Component, EventEmitter, OnInit, Output } from '@angular/core';

enum Tabs {
  albums,
  photos,
  shared
}
@Component({
  selector: 'app-hometabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss'],
})
export class HometabsComponent implements OnInit {


  @Output() buttonSetActive = new EventEmitter<string>();
  public isActive: Tabs = Tabs.albums;

	public readonly tabs = Tabs;
  constructor() { }

  ngOnInit() {
    this.isActive = Tabs.albums;
  }

  goTo(tab: string) {
    // this.buttonSetActive.emit(tab);
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
    console.log(this.isActive);
  }


}
