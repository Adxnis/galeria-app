import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UploadPhotoComponent } from '../../../modals/upload-photo/upload-photo.component';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async presentUploadModal() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'create-album'
    });
    return await modal.present();

  }

}
