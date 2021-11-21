import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  activeTab = "albums";
  constructor() { }

  ngOnInit() {
    console.log("hey")
  }

  display(tab: string) {
    this.activeTab = tab;
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("JSNS");
  }

}
