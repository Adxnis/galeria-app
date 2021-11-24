import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  view: string = "compact";
  sort: string = "sortByDate";
  activeTab = "albums";
  constructor() { }

  ngOnInit() {
    console.log("hey")
  }

  // tabs
  display(tab: string) {
    this.activeTab = tab;
    console.log("TAB: " + tab);
  }

  changeView(view: string) {
    console.log("View: " + view);
    this.view = view;
  }

  changeSort(sort: string) {
    console.log("Sort: " + sort);
    this.sort = sort;
  }
}
