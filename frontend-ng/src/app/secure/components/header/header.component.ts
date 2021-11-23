import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { SortPopoverComponent } from 'src/app/secure/modals/sort-popover/sort-popover.component';
import { AuthService } from 'src/app/services/auth.service';
import { ViewPopoverComponent } from '../../../secure/modals/view-popover/view-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() displayActiveTab = new EventEmitter<string>();
  @Output() displayView = new EventEmitter<string>();
  public title = 'Galeria';
  currentView: string = "compact";
  public fullView: boolean;
  public compactView: boolean = true;

  constructor(public popoverController: PopoverController, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  setActiveTab(tab: string) {
    this.displayActiveTab.emit(tab);
  }

  changeView(view: string) {
    this.displayView.emit(view)
  }
  async presentViewMenu(ev?: any) {
    console.log('IM IN HERE');
    const popover = await this.popoverController.create({
      component: ViewPopoverComponent,
      cssClass: 'view-menu',
      event: ev,
      translucent: true,
      showBackdrop: false,
      animated: false,
      componentProps: {currentView: this.currentView}
    });
    await popover.present();

    await popover.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        console.log(res.data.value);
        let view = res.data.value;
        this.currentView = view;
        this.changeView(view);
      }
    })
  }

  async presentSortMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: SortPopoverComponent,
      cssClass: 'view-menu',
      event: ev,
      translucent: true,
      showBackdrop: false,
      animated: false,
      // backdropDismiss: true,
      // keyboardClose: true,
      // mode: 'ios'
    });
    await popover.present();
    await popover.onDidDismiss().then((res) => {
      console.log(res)
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log("success")
    })
  }

}
