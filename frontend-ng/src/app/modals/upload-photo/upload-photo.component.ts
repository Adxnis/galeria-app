import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddToAlbumComponent } from '../add-to-album/add-to-album.component';
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async presentAddToAlbumModal() {
    const modal = await this.modalController.create({
      component: AddToAlbumComponent,
      cssClass: 'create-album'
    });
    return await modal.present();
  }

}
