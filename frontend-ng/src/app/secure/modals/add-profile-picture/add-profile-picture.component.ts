import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

////////////////////////////////
////// This component handles the upload of the profile picture 

@Component({
  selector: 'app-add-profile-picture',
  templateUrl: './add-profile-picture.component.html',
  styleUrls: ['./add-profile-picture.component.scss'],
})
export class AddProfilePictureComponent implements OnInit {

  public image: string;
  constructor(private alertCtrl: AlertController, private modalController: ModalController) { }

  ngOnInit() {}

   // show warning message
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

  getPhotoUrl(photoInfo) {
    this.image = photoInfo[0];
  }

  confirmProfilePicture() {
    this.modalController.dismiss(this.image);
  }

}
