import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { AuthService } from 'src/app/services/auth.service';
import { DiscoveryService } from 'src/app/services/discovery.service';
import { PhotoService } from 'src/app/services/photo.service';
import { SortPopoverComponent } from '../modals/sort-popover/sort-popover.component';
import { ViewPopoverComponent } from '../modals/view-popover/view-popover.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  // view and sort default mode
  public currentView: string = "compact";
  public defaultSortBy: string = "sortbydate";
  // get photos
  public photos: Photo[];
  public title = 'Galeria';
  public currentRoute: string;


  // Used to search by tags
  public tag: string;

  // Only get all public photos if route matches
  constructor(
    private authService: AuthService,
    private discoveryService: DiscoveryService,
    private photoService: PhotoService,
    private popoverController: PopoverController, 
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute == "/discover" && event.urlAfterRedirects === "/discover") {
          this.getAllPublicPhotos();
        }
      }
    });
  }

  ngOnInit() {
  }

  // log out
  public logout(): void {
    this.authService.logout().subscribe();
  }

  // Show view popover
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

    await popover.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        let view = res.data.value;
        this.currentView = view;
      }
    });
  }

  // show sort popover
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
    await popover.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        let sortBy = res.data.value;
        this.defaultSortBy = sortBy;
        this.sort();
      }
    });
  }

  // get all photos that are set to be shared
  getAllPublicPhotos() {
    this.discoveryService.all().subscribe(photos => this.photos = photos);
  }

  // sort
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

    // search by tags
    searchByTags() {
      if(this.tag != ""){
        this.photoService.searchByTags(this.tag).subscribe((photos: Photo[]) => {
          this.photos = photos;
        })
      } 
      else {
        this.getAllPublicPhotos()
      }

    }




}
