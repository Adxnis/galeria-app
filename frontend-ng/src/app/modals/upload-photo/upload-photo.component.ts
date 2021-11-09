import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      photoName: '',
      fileName: '',
      fileType: '',
      dateLastModified: ''
    })
  }

  async presentAddToAlbumModal() {
    const modal = await this.modalController.create({
      component: AddToAlbumComponent,
      cssClass: 'create-album'
    });
    return await modal.present();
  }




}
