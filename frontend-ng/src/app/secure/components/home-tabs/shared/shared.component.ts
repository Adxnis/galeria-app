import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/interfaces/album';
import { CreateNewSharedAlbumComponent } from 'src/app/secure/modals/create-new-shared-album/create-new-shared-album.component';
import { EditAlbumPopoverComponent } from 'src/app/secure/modals/edit-album-popover/edit-album-popover.component';
import { AlbumService } from 'src/app/services/album.service';
import { SharedAlbumService } from 'src/app/services/shared-album.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit, OnDestroy {

  sharedAlbumSubscription$: Subscription;
  @Input() view: string;
  @Input() sort: string;
  public sharedAlbums: Album[] = [];
  constructor(private modalController: ModalController, private sharedAlbumService: SharedAlbumService, private albumService: AlbumService, private popoverController: PopoverController, private router: Router) { }

  ngOnInit() {
    this.getSharedAlbums();
  }

  ngOnDestroy() {
    this.sharedAlbumSubscription$.unsubscribe();
  }

  // sort pictures by name, size or date
  ngOnChanges(changes: SimpleChanges) {
    console.log("Changing")
    console.log(changes.sort.currentValue);
    console.log(this.sharedAlbums);

    if(this.sharedAlbums != undefined) {
      if (changes.sort.currentValue === "sortbysize") {
        this.sharedAlbums = this.sharedAlbums.sort((a, b) => {
          return b.total_size - a.total_size;
        });
      }

      if (changes.sort.currentValue === "sortbydate") {
        this.sharedAlbums = this.sharedAlbums.sort((a, b) => {
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
      if (changes.sort.currentValue === "sortbyname") {
        this.sharedAlbums = this.sharedAlbums.sort((a, b) => {
          
          let na = a.album_name.toLowerCase(),
              nb = b.album_name.toLowerCase();
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

  public async presentCreatedSharedAlbumModal() {
    const modal = await this.modalController.create({
      component: CreateNewSharedAlbumComponent,
      cssClass: 'create-album-2 auto-height',
      componentProps: { albumPage: true }
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      // this.getAlbums();
      if (res.data != undefined) {
        this.albumService.update(res.data.album_id, { photos: [res.data.photo.id] }).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

  public getSharedAlbums() {
    this.sharedAlbumSubscription$ = this.albumService.sharedAlbums().subscribe((sharedAlbums: Album[]) => {
      console.log(sharedAlbums);
      this.sharedAlbums = sharedAlbums;
    })
  }

  async editAlbum(ev: any, album: Album) {
    console.log(album);
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

  goToSingleAlbumView(album_id: number) {
    this.router.navigate(['/album', album_id]);
  }




}
