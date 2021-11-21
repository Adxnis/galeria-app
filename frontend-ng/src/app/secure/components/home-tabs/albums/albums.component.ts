import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { CreateNewAlbumComponent } from 'src/app/secure/modals/create-new-album/create-new-album.component';
import { EditAlbumPopoverComponent } from 'src/app/secure/modals/edit-album-popover/edit-album-popover.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {

  public albums: Album[] = [];
  constructor(private modalController: ModalController, private albumService: AlbumService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getAlbums();
    console.log("ONIT")
  }

  ngAfterViewInit() {
    console.log("AFTER")
  }

  public getAlbums() {
    this.albumService.albums().subscribe((albums) => {
      console.log(albums);
      this.albums = albums
    })
  }

  async presentCreateModal() {

    const modal = await this.modalController.create({
      component: CreateNewAlbumComponent,
      cssClass: 'create-album-2 auto-height',
      componentProps: { albumPage: true }
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {

      this.getAlbums();
      if (res.data != undefined) {
        this.albumService.update(res.data.album_id, { photos: [res.data.photo.id] }).subscribe((res) => console.log(res));
      }
      this.getAlbums();
    });

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
      componentProps: {album: album},
      id: 'edit-album'
    });
    await popover.present();
    await popover.onDidDismiss().then(() => { this.getAlbums(); });
  }


}

