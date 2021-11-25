import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/interfaces/album';
import { CreateNewSharedAlbumComponent } from 'src/app/secure/modals/create-new-shared-album/create-new-shared-album.component';
import { EditAlbumPopoverComponent } from 'src/app/secure/modals/edit-album-popover/edit-album-popover.component';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit, OnDestroy {
  // Data to receive from parent component (homepage)
  @Input() view: string;
  @Input() sort: string;

  // subscriptions
  sharedAlbumSubscription$: Subscription;

  // shared albums
  public sharedAlbums: Album[] = [];
  constructor(private modalController: ModalController, private albumService: AlbumService, private popoverController: PopoverController, private router: Router) { }

  // populate page with shared albums
  ngOnInit() {
    this.getSharedAlbums();
  }

  // unsubscribe
  ngOnDestroy() {
    this.sharedAlbumSubscription$.unsubscribe();
  }

  // sort pictures by name, size or date
  ngOnChanges(changes: SimpleChanges) {
    if (this.sharedAlbums != undefined) {
      if (changes?.sort?.currentValue === "sortbysize") {
        this.sharedAlbums = this.sharedAlbums.sort((a, b) => {
          return b.total_size - a.total_size;
        });
      }

      if (changes?.sort?.currentValue === "sortbydate") {
        this.sharedAlbums = this.sharedAlbums.sort((a, b) => {
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
      if (changes?.sort?.currentValue === "sortbyname") {
        this.sharedAlbums = this.sharedAlbums.sort((a, b) => {

          let na = a.album_name.toLowerCase(),
            nb = b.album_name.toLowerCase();
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

  // present create new album dialog
  // If the dialog is being activated from the shared album page 
  // send albumPage = true in component props for view purposes
  public async presentCreatedSharedAlbumModal() {
    const modal = await this.modalController.create({
      component: CreateNewSharedAlbumComponent,
      cssClass: 'create-album-2 auto-height',
      componentProps: { albumPage: true }
    });
    await modal.present();
    // add photo to album if photo uploaded
    modal.onDidDismiss().then((res) => {
      if (res.data != undefined) {
        if (res.data.photo) {
          this.albumService.update(res.data.album_id, { photos: [res.data.photo.id] }).subscribe((res) => {
            this.getSharedAlbums();
          });
        }
        // if no photo was uploaded with album do nothing
        else {
          this.getSharedAlbums();
        }
      }
    });
  }


  // get shared album from service 
  public getSharedAlbums() {
    this.sharedAlbumSubscription$ = this.albumService.sharedAlbums().subscribe((sharedAlbums: Album[]) => {
      this.sharedAlbums = sharedAlbums;
    })
  }

  // edit album or delete album
  async editAlbum(ev: any, album: Album) {
    const popover = await this.popoverController.create({
      component: EditAlbumPopoverComponent,
      translucent: true,
      event: ev,
      showBackdrop: false,
      animated: false,
      cssClass: 'view-menu',
      componentProps: { album: album },
      id: 'edit-album'
    });
    await popover.present();
    await popover.onDidDismiss().then(() => { this.getSharedAlbums(); });
  }

  // single album view
  goToSingleAlbumView(album_id: number) {
    this.router.navigate(['/album', album_id]);
  }
}
