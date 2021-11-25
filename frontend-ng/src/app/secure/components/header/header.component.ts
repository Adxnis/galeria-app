import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SortPopoverComponent } from 'src/app/secure/modals/sort-popover/sort-popover.component';
import { AuthService } from 'src/app/services/auth.service';
import { ViewPopoverComponent } from '../../../secure/modals/view-popover/view-popover.component';

////////////////////////////////
// header in home page
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Data to be sent to homepage component
  @Output() displayActiveTab = new EventEmitter<string>();
  @Output() displayView = new EventEmitter<string>();
  @Output() sortByView = new EventEmitter<string>();

  // default values
  public title = 'Galeria';
  public currentView: string = "compact";
  public defaultSortBy: string = "sortbydate"

  // subscriptions
  public authSubscription$: Subscription;

  constructor(
    public popoverController: PopoverController, 
    private authService: AuthService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.authSubscription$.unsubscribe();
  }

  // Emit tab name to parent component for switching pages
  setActiveTab(tab: string) {
    this.displayActiveTab.emit(tab);
  }

  // Emit view value 
  changeView(view: string) {
    this.displayView.emit(view)
  }

  // Emit sort value
  changeSort(sort: string) {
    this.sortByView.emit(sort);
  }

  // present view popover
  async presentViewMenu(ev?: any) {
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

    // get selected view value from popover after dismiss and emit value
    await popover.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        let view = res.data.value;
        this.currentView = view;
        this.changeView(view);
      }
    })
  }

  // present sort menu
  async presentSortMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: SortPopoverComponent,
      cssClass: 'view-menu',
      event: ev,
      translucent: true,
      showBackdrop: false,
      animated: false,
      componentProps: {sortBy: this.defaultSortBy}
    });
    await popover.present();
     // get selected sort value from popover after dismiss and emit value
    await popover.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        let view = res.data.value;
        this.defaultSortBy = view;
        this.changeSort(view);
      }
    })
  }

  // log out
  logout(): void {
    this.authSubscription$ = this.authService.logout().subscribe();
  }

}
