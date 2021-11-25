import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { RenameAlbumComponent } from '../rename-album/rename-album.component';

@Component({
  selector: 'app-edit-album-popover',
  templateUrl: './edit-album-popover.component.html',
  styleUrls: ['./edit-album-popover.component.scss'],
})
export class EditAlbumPopoverComponent implements OnInit, OnDestroy {

  // get album name
  @Input() album: Album;

  // subscriptions
  public albumSubscription$: Subscription

  constructor(
    private albumService: AlbumService, 
    private modalController: ModalController, 
    private popover: PopoverController) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.albumSubscription$.unsubscribe();
  }

  // delete album
  public async deleteAlbum() {
    this.albumSubscription$ = this.albumService.delete(this.album.id).subscribe((res)=> {
      this.popover.dismiss();
    });
  }

  // show rename album dialog
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
