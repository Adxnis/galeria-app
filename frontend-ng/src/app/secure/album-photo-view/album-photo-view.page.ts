import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Album } from 'src/app/interfaces/album';
import { Photo } from 'src/app/interfaces/photo';
import { AlbumService } from 'src/app/services/album.service';
import { SortPopoverComponent } from '../modals/sort-popover/sort-popover.component';
import { ViewPopoverComponent } from '../modals/view-popover/view-popover.component';

@Component({
  selector: 'app-album-photo-view',
  templateUrl: './album-photo-view.page.html',
  styleUrls: ['./album-photo-view.page.scss'],
})
export class AlbumPhotoViewPage implements OnInit {

  // ids
  public album_id: number;

  // Objects
  public album: Album;
  public photos: Photo[];

  // view and sort default mode
  public currentView: string = "compact";
  public defaultSortBy: string = "sortbydate";

  constructor(private route: ActivatedRoute, private router: Router, private albumService: AlbumService, private popoverController: PopoverController) { }

  // set id from route to album id
  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.album_id = id;
    this.albumService.get(this.album_id).subscribe((response: Album) => {
      this.album = response;
      this.photos = response.photos;
    })
  }

  goBack() {
    this.router.navigate(['/home'])
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
      componentProps: { currentView: this.currentView }
    });
    await popover.present();

    await popover.onDidDismiss().then((res) => {
      if (res.data != undefined) {
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
      componentProps: { sortBy: this.defaultSortBy }
    });
    await popover.present();
    await popover.onDidDismiss().then((res) => {
      if (res.data != undefined) {
        let sortBy = res.data.value;
        this.defaultSortBy = sortBy;
        this.sort();
      }
    });
  }

  sort() {
    if (this.photos != undefined) {
      if (this.defaultSortBy === "sortbysize") {
        this.photos = this.photos.sort((a, b) => {
          return parseInt(b.size) - parseInt(a.size);
        });
      }

      if (this.defaultSortBy === "sortbydate") {
        this.photos = this.photos.sort((a, b) => {
          let da = a.created_at,
            db = b.created_at;
          if (da < db) {
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
          if (na < nb) {
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
    this.router.navigate([`album/${this.album_id}/photo`, photo_id]);
  }



}
