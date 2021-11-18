import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-to-album',
  templateUrl: './add-to-album.component.html',
  styleUrls: ['./add-to-album.component.scss'],
})
export class AddToAlbumComponent implements OnInit {

  public albums = [];
  public sharedAlbums = [];
  constructor(private modalController: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log("IM IN HERE");
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
