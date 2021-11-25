import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { CreateNewAlbumComponent } from 'src/app/secure/modals/create-new-album/create-new-album.component';
import { EditAlbumPopoverComponent } from 'src/app/secure/modals/edit-album-popover/edit-album-popover.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  // Data to receive from parent component (homepage)
  @Input() view: string;
  @Input() sort: string;

  // subscriptions
  albumSubscription$: Subscription;

  // albums
  public albums: Album[] = [];

  constructor(
    private modalController: ModalController,
    private albumService: AlbumService,
    private popoverController: PopoverController,
    private router: Router) { }

  // populate page with albums
  ngOnInit() {
    this.getAlbums();
  }

  // unsubscribe
  ngOnDestroy() {
    this.albumSubscription$.unsubscribe();
  }

  // sort pictures by name, size or date
  ngOnChanges(changes: SimpleChanges) {
    if (this.albums != undefined) {
      if (changes?.sort?.currentValue === "sortbysize") {
        this.albums = this.albums.sort((a, b) => {
          return b.total_size - a.total_size;
        });
      }

      if (changes?.sort?.currentValue === "sortbydate") {
        this.albums = this.albums.sort((a, b) => {
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
        this.albums = this.albums.sort((a, b) => {

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

  // get albums from service
  public getAlbums() {
    this.albumSubscription$ = this.albumService.albums().subscribe((albums) => {
      this.albums = albums
    })
  }

  // present create new album dialog
  // If the dialog is being activated from the album page 
  // send albumPage = true in component props for view purposes
  async presentCreateModal() {
    const modal = await this.modalController.create({
      component: CreateNewAlbumComponent,
      cssClass: 'create-album-2 auto-height',
      componentProps: { albumPage: true }
    });
    await modal.present();
    // add photo to album if photo uploaded
    modal.onDidDismiss().then((res) => {
      if (res.data != undefined) {
        if (res.data.photo) {
          this.albumService.update(res.data.album_id, { photos: [res.data.photo.id] }).subscribe((res) => {
            this.getAlbums();
          });
        }
        // if no photo was uploaded with album do nothing
        else {
          this.getAlbums();
        }
      }
    });
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
    // reload all albums
    await popover.onDidDismiss().then(() => { 
      this.getAlbums(); });
  }

  // single album view
  goToSingleAlbumView(album_id: number) {
    this.router.navigate(['/album', album_id]);
  }


}

