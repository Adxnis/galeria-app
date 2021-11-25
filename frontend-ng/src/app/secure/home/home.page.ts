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

  ngOnInit() {}

  // tabs
  display(tab: string) {
    this.activeTab = tab;
  }

  changeView(view: string) {
    this.view = view;
  }

  changeSort(sort: string) {
    this.sort = sort;
  }
}
