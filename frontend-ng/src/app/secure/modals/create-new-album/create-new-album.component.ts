import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  // reactive form
  form: FormGroup;

  // if false this modal is being activated from photos page
  @Input() albumPage: boolean;
  // @Input() image: any;
  public imageURL: string;
  public photo: Photo;

  // error checking
  public formSubmitted = false;

  constructor(
    private modalController: ModalController, 
    private alertCtrl: AlertController, 
    private navParams: NavParams, 
    private albumService: AlbumService, 
    private formBuilder: FormBuilder, 
    private tagService: TagService) { }

  ngOnInit() {
    // get input data from album name form field
    this.form = this.formBuilder.group({
      album_name: ['', Validators.required],
    });

    // get url from uploaded photo from upload photo modal
    this.imageURL = this.navParams.data.image
  }

  // form control value
  get album_name(){return this.form.get('album_name');}



  // open create new album dialog 
  public createAlbum(): void {
    this.formSubmitted = true;
    if(this.form.status == "VALID") {
      this.albumService.create(this.form.getRawValue()).subscribe((res) => {
        this.modalController.dismiss({album_id: res.id, photo: this.photo});
      });
    }
  }

  // open upload photo dialog 
  public async uploadPhoto() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'upload-photo auto-height', 
      backdropDismiss: false,
      componentProps: {albumPage: this.albumPage}
      
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      // photo has been uploaded
      // get url from photo
      // if tags add them to photos
      if (res.data != undefined) {      
        let tagName: string[] = res.data.tags;
        this.photo = res.data.photo;
        this.imageURL = this.photo.file_name;
        if(tagName.length > 0) {
          for(let i=0; i < tagName.length; i++) {
            this.tagService.create({title: tagName[i], photos: [this.photo.id]}).subscribe(res => {console.log(res)});
          }
        }
      }      
    });
  }

  // Show warning message
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
