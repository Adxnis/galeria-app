import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AlbumService } from 'src/app/services/album.service';
import { CreateNewAlbumComponent } from '../create-new-album/create-new-album.component';
@Component({
  selector: 'app-add-to-album',
  templateUrl: './add-to-album.component.html',
  styleUrls: ['./add-to-album.component.scss'],
})
export class AddToAlbumComponent implements OnInit {

  public albums = [];
  public sharedAlbums = [];
  public image: string;
  constructor(private modalController: ModalController, private alertCtrl: AlertController, private albumService: AlbumService, private navParams: NavParams) { }

  ngOnInit() {
    console.log("IM IN HERE");
    this.getAlbums();
    this.image = this.navParams.data.image;
    console.log(this.image);
  }

  public async getAlbums() {
    this.albumService.albums().subscribe((albums) => 
    {
      this.albums = albums;
      console.log(this.albums);
    });
  }

  async presentCreateModal() {

    const modal = await this.modalController.create({
      component: CreateNewAlbumComponent,
      cssClass: 'create-album auto-height',
      componentProps: {image: this.image},
      id: 'create-album'
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      let photo_id = res.data.album_id
      this.getAlbums();
      this.modalController.dismiss(
        '','','create-album')
    });

  }
  
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
}
