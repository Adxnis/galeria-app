import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { RenameAlbumComponent } from '../rename-album/rename-album.component';

@Component({
  selector: 'app-edit-album-popover',
  templateUrl: './edit-album-popover.component.html',
  styleUrls: ['./edit-album-popover.component.scss'],
})
export class EditAlbumPopoverComponent implements OnInit {

  @Input() album: Album;
  constructor(private albumService: AlbumService, private modalController: ModalController, private popover: PopoverController) { }

  ngOnInit() {
    this.getAlbums();
  }

  public async getAlbums() {
    this.albumService.albums().subscribe((albums) => { 
    })
  }

  public async deleteAlbum() {
    console.log("DELETING " +  this.album.id)
    this.albumService.delete(this.album.id).subscribe((res)=> {
      console.log("DELETEDALBUM ");
      this.popover.dismiss();
    });
  }

  public async renameAlbum() {
    const modal = await this.modalController.create({
      component: RenameAlbumComponent,
      cssClass: 'create-album-2 auto-height',
      componentProps: { album: this.album},
      id: 'rename'
    });
    await modal.present();
    await modal.onDidDismiss().then(() => {
      this.popover.dismiss();
    });
  }

}
