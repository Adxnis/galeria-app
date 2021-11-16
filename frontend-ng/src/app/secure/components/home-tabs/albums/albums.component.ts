import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateNewAlbumComponent } from 'src/app/secure/modals/create-new-album/create-new-album.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async presentCreateModal() {

    const modal = await this.modalController.create({
      component: CreateNewAlbumComponent,
      cssClass: 'create-album'
    });
    return await modal.present();
  }
}

