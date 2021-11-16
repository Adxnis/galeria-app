import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private formBuilder: FormBuilder, private photoService: PhotoService, ) { }



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

  public addToForm(photoInfo){
    console.log(photoInfo);
    this.form.patchValue({
      'file_name': photoInfo[0],
      'file_type': photoInfo[1],
      'size': photoInfo[2],
    });
  }

  
  submit() {
    this.photoService.addPhoto(this.form.getRawValue()).subscribe();
    this.closeModal();
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  




}
