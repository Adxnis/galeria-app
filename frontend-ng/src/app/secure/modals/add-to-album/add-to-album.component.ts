import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AlbumService } from 'src/app/services/album.service';
import { CreateNewAlbumComponent } from '../create-new-album/create-new-album.component';
import { Album } from 'src/app/interfaces/album';
import { CreateNewSharedAlbumComponent } from '../create-new-shared-album/create-new-shared-album.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-to-album',
  templateUrl: './add-to-album.component.html',
  styleUrls: ['./add-to-album.component.scss'],
})
export class AddToAlbumComponent implements OnInit {

  public albums: Album[];
  public sharedAlbums: Album[];
  public imageURL: string;
  public selectedAlbumId: number

  // subscriptions
  public sharedAlbumSubscription$: Subscription;
  public albumSubscription$: Subscription;

  constructor(
    private modalController: ModalController, private alertCtrl: AlertController, 
    private albumService: AlbumService, 
    private navParams: NavParams) { }

  // show all shared and personal albums to choose from 
  // get the uploaded image
  ngOnInit() {
    this.getAlbums();
    this.getSharedAlbums();
    this.imageURL = this.navParams.data.imageURL;
  }

  // unsubscribe 
  ngOnDestroy() {
    if(this.sharedAlbumSubscription$ != null) {
      this.sharedAlbumSubscription$.unsubscribe();
    }
    if(this.albumSubscription$ != null) {
      this.albumSubscription$.unsubscribe();
    }
  }

  // get albums from service
  public async getAlbums() {
    this.albumSubscription$ = this.albumService.albums().subscribe((albums) => 
    {
      this.albums = albums;
    });
  }

  // get shared albums from service
  public getSharedAlbums() {
    this.sharedAlbumSubscription$ = this.albumService.sharedAlbums().subscribe((sharedAlbums: Album[]) => {
      this.sharedAlbums = sharedAlbums;
    })
  }

  // Create a new album dialog
  async presentCreateAlbumModal() {
    const modal = await this.modalController.create({
      component: CreateNewAlbumComponent,
      cssClass: 'create-album auto-height',
      componentProps: {image: this.imageURL},
      id: 'create-album'
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      if(res.data != undefined) {
        let photo_id = res.data.album_id
        this.getAlbums();
        this.modalController.dismiss(
          '','','create-album')
      }
    });

  }

  // Create a new shared album dialog
  async presentCreateSharedAlbumModal() {
    const modal = await this.modalController.create({
      component: CreateNewSharedAlbumComponent,
      cssClass: 'create-album auto-height',
      componentProps: {image: this.imageURL},
      id: 'create-album'
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      // let photo_id = res.data.album_id
      this.getAlbums();
      this.modalController.dismiss(
        '','','create-album')
    });

  }

  // Create an alert box to warn and exit with no update
  async cancel() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: '<div>Are you sure you want to exit?</div>',
      backdropDismiss: false,
      animated: false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.modalController.dismiss();
          }
        },
        { text: 'No' }
      ]
    });
    await alert.present();
  }

  // dismiss modal with the selected album
  getSelectedAlbum(album: Album) {
    this.modalController.dismiss(album);
  }
}
