import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AlbumService } from 'src/app/services/album.service';
import { TagService } from 'src/app/services/tag.service';
import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';

@Component({
  selector: 'app-create-new-album',
  templateUrl: './create-new-album.component.html',
  styleUrls: ['./create-new-album.component.scss'],
})
export class CreateNewAlbumComponent implements OnInit {
  form: FormGroup;
  public image: string;
  constructor(private modalController: ModalController, private alertCtrl: AlertController, private navParams: NavParams, private albumService: AlbumService, private formBuilder: FormBuilder, private tagService: TagService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      album_name: '',
    });
    this.image = this.navParams.data.image
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

  public createAlbum(): void {
    console.log(this.form.getRawValue())

    // this.albumService.create(this.form.getRawValue()).subscribe((res) => {
    //   console.log(res);
    //   this.modalController.dismiss({album_id: res.id});
    // });
  }

  public async uploadPhoto() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'upload-photo auto-height', 
      backdropDismiss: false,
      
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      

      if (res.data != undefined) {      
        console.log(res);
        console.log(res.data.tags);
        let tagName: string[] = res.data.tags;
        console.log(tagName.length);
        for(let i=0; i < tagName.length; i++) {
          this.tagService.create({title: tagName[i], photos: [res.data.photo_id]}).subscribe(res => {console.log(res)});
        }
      }      
    });
  }
    
}
