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
  public title = 'Galeria';

  constructor(public popoverController: PopoverController, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  setActiveTab(tab: string) {
    this.displayActiveTab.emit(tab);
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
      // backdropDismiss: true,
      // keyboardClose: true,
      // mode: 'ios'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
