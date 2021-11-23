import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { AuthService } from 'src/app/services/auth.service';
import { DiscoveryService } from 'src/app/services/discovery.service';
import { SortPopoverComponent } from '../modals/sort-popover/sort-popover.component';
import { ViewPopoverComponent } from '../modals/view-popover/view-popover.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  currentView: string = "compact";
  public fullView: boolean;
  public compactView: boolean = true;

  public photos: Photo[];
  public title = 'Galeria';
  currentRoute: string;

  constructor(private authService: AuthService,
    private discoveryService: DiscoveryService, private popoverController: PopoverController, private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
        if (this.currentRoute == "/discover" && event.urlAfterRedirects === "/discover") {
          this.getAllPublicPhotos();
        }
        console.log(event);
      }
    });
  }

  ngOnInit() {
    // this.getAllPublicPhotos();
    console.log("IN HERE")
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      console.log("success")
    })
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
    });
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
    await popover.onDidDismiss().then((view) => {
      console.log(view.data.value);
      let x = view.data.value;
      console.log("HE " + x)
      
    });
  }

  getAllPublicPhotos() {
    this.discoveryService.all().subscribe(photos => this.photos = photos);
  }


  changeView(view: string){
    if(view === "compact") {
      this.compactView = true;
      this.fullView = false;
    }
    else {
      this.compactView = false;
      this.fullView = true;
    }
  }

}
