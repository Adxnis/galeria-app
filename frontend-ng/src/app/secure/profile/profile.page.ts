import { Component, OnInit, ViewChild } from '@angular/core';
import { IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public hidePictures: boolean = false;
  @ViewChild('toggle') toggle: IonToggle;

  constructor() { }

  ngOnInit() {

  }

  



}
