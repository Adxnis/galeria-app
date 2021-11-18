import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';
import { AddToAlbumComponent } from '../add-to-album/add-to-album.component';
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
  form: FormGroup;

  constructor(private modalController: ModalController, private http: HttpClient,
    private formBuilder: FormBuilder, private photoService: PhotoService,) { }


  image: any;
  tags: string[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      file_name: '',
      file_type: '',
      date_last_modified: '',
      size: '',
    })
  }

  async presentAddToAlbumModal() {
    const modal = await this.modalController.create({
      component: AddToAlbumComponent,
      cssClass: 'create-album'
    });
    return await modal.present();
  }

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

  tagFormat(event: any) {

    // console.log(event.target.value.length)
    if (event.target.value.length == 0 || event.target.value == '') {
      event.target.value = '#'
    }

    if (event.keyCode == 32) {
      console.log("im a space")
      // ADD TAG
      let string = event.target.value.substring(1).trim();
      if(string != ""){
        this.tags.push(string);
      }
      console.log(this.tags);
    }
    // event.target.value = ''
  }

  clear(event: any) {
    if (event.keyCode == 32 && event.target.value.length > 2) {
      event.target.value = '';
    }
  }

  submit() {  
    this.photoService.addPhoto(this.form.getRawValue()).subscribe();
    this.closeModal();
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss();
  }

}
