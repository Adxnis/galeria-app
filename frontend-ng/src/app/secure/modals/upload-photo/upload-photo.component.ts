
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Tag } from 'src/app/interfaces/tag';
import { PhotoService } from 'src/app/services/photo.service';
import { AddToAlbumComponent } from '../add-to-album/add-to-album.component';
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
  public form: FormGroup;
  public image: string;
  public tags: Tag[] = [];
  // get album from parent component
  @Input() albumPage: boolean;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder, 
    private photoService: PhotoService, 
    private alertCtrl: AlertController) { }

  // Initialize form 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      file_name: '',
      file_type: '',
      date_last_modified: '',
      size: '',
      isPublic: false
    });
  }

  // Receieve photo information from upload
  // Add data to form
  public addToForm(photoInfo) {
    console.log("PHOTOINFO")
    console.log(photoInfo);
    this.image = photoInfo[0];
    this.form.patchValue({
      'file_name': photoInfo[0],
      'file_type': photoInfo[1],
      'size': photoInfo[2],
    });
  }

  // Insert a # on input
  // Add to tags[] after space 
  tagFormat(event: any) {
    if (event.target.value.length == 0 || event.target.value == '') {
      event.target.value = '#'
    }

    // keycode 32 = space
    if (event.keyCode == 32) {
      console.log("im a space")
      // ADD TAG
      let string = event.target.value.substring(1).trim();
      if (string != "") {
        this.tags.push(string);
      }
      console.log(this.tags);
    }
  }

  // delete tag
  deleteTag(tag: any) {
    this.tags = this.tags.filter(e => e != tag)
  }

  isPublic(event: any): void {
    // const isPublic = event.target.checked;
    // console.log(isPublic);
  }

  // Clear input 
  clear(event: any) {
    if (event.keyCode == 32 && event.target.value.length > 2) {
      event.target.value = '';
    }
  }

  // open add to album dialog
  async presentAddToAlbumModal() {
    const modal = await this.modalController.create({
      component: AddToAlbumComponent,
      cssClass: 'add-to-album auto-height modal',
      componentProps: { image: this.image },
      id: 'add-to-album'
    });
    await this.modalController.dismiss();
    return await modal.present();
  }

  // Create photo
  submit() {
    this.photoService.create(this.form.getRawValue()).subscribe((res: any) => {
      this.closeModal(this.tags, res);
    })
  }

  // After close send tag and photo data to photo component
  async closeModal(tags?: Tag[], photo?: any): Promise<void> {
    await this.modalController.dismiss({ tags: tags, photo: photo });
  }

  // Create an alert box to warn and exit with no update to the patient enrollment form
  async cancel() {
    let title: any = document.getElementById('title');
    if (title.value.length > 0) {
      const alert = await this.alertCtrl.create({
        header: 'Warning',
        message: '<div>Change will not be saved. Are you sure you want to exit?</div>',
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
    else {
      this.modalController.dismiss();
    }
  }
}
