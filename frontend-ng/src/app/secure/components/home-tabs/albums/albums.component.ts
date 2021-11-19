import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { CreateNewAlbumComponent } from 'src/app/secure/modals/create-new-album/create-new-album.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {

  public albums: Album[] = [];
  constructor(private modalController: ModalController, private AlbumService: AlbumService) { }

  ngOnInit() { }

  public async getAlbums() {
    this.AlbumService.albums().subscribe(albums => this.albums = albums )
  }
  
  async presentCreateModal() {

    const modal = await this.modalController.create({
      component: CreateNewAlbumComponent,
      cssClass: 'create-album-2 auto-height'
    });
    return await modal.present();
  }

  
}

