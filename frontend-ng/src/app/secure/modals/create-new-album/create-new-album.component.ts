import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
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
  @Input() albumPage: boolean;
  public image: string;
  public photo: Photo;


  constructor(
    private modalController: ModalController, 
    private alertCtrl: AlertController, 
    private navParams: NavParams, 
    private albumService: AlbumService, 
    private formBuilder: FormBuilder, 
    private tagService: TagService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      album_name: '',
    });
    this.image = this.navParams.data.image
    console.log("OM BACK")
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

    this.albumService.create(this.form.getRawValue()).subscribe((res) => {
      console.log(res);
      this.modalController.dismiss({album_id: res.id, photo: this.photo});
    });
  }

  public async uploadPhoto() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'upload-photo auto-height', 
      backdropDismiss: false,
      componentProps: {albumPage: this.albumPage}
      
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      

      if (res.data != undefined) {      
        console.log(res);
        console.log(res.data.tags);
        let tagName: string[] = res.data.tags;
        this.photo = res.data.photo;
        this.image = this.photo.file_name;
        console.log(tagName.length);
        console.log(this.photo.id)
        for(let i=0; i < tagName.length; i++) {
          this.tagService.create({title: tagName[i], photos: [this.photo.id]}).subscribe(res => {console.log(res)});
        }

      }      
    });
  }
  
  public submit() {
    console.log(this.photo);
  }
    
}
