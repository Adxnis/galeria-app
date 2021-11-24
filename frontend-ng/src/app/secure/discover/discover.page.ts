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

  public currentView: string = "compact";
  public photos: Photo[];
  public title = 'Galeria';
  public currentRoute: string;
  public defaultSortBy: string = "sortbydate";

  constructor(private authService: AuthService,
    private discoveryService: DiscoveryService, private popoverController: PopoverController, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute == "/discover" && event.urlAfterRedirects === "/discover") {
          this.getAllPublicPhotos();
        }
        console.log(event);
      }
    });
  }

  ngOnInit() {
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
      componentProps: {sortBy: this.defaultSortBy}
      // backdropDismiss: true,
      // keyboardClose: true,
      // mode: 'ios'
    });
    await popover.present();
    await popover.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        console.log("titts")
        console.log(res.data.value);
        let sortBy = res.data.value;
        this.defaultSortBy = sortBy;
        this.sort();


      }
    });
  }

  getAllPublicPhotos() {
    this.discoveryService.all().subscribe(photos => this.photos = photos);
  }

  sort() {
    if(this.photos != undefined) {
      if (this.defaultSortBy === "sortbysize") {
        this.photos = this.photos.sort((a, b) => {
          return parseInt(b.size) - parseInt(a.size);
        });
      }

      if (this.defaultSortBy === "sortbydate") {
        this.photos = this.photos.sort((a, b) => {
          let da = a.created_at,
          db = b.created_at;
          if(da < db) {
            return -1;
          }
          if (da > db) {
            return 1;
          }
          return 0;
        });
      }
      if (this.defaultSortBy === "sortbyname") {
        this.photos = this.photos.sort((a, b) => {
          
          let na = a.name.toLowerCase(),
              nb = b.name.toLowerCase();
            if(na < nb) {
              return -1;
            }
            if (na > nb) {
              return 1;
            }
            return 0;
        });
      }

    }
  }

    // Single view
    goToSinglePhotoView(photo_id: number) {
      this.router.navigate(['/discover/photos', photo_id]);
    }




}
