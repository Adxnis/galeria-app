import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { TagService } from 'src/app/services/tag.service';
import { UploadPhotoComponent } from '../../../../secure/modals/upload-photo/upload-photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {


  public photos: Photo[] = [];
  
  constructor(
    private modalController: ModalController,
    private photoService: PhotoService, private tagService: TagService) { }

  ngOnInit() { 
    this.getPhotos();
  }

  public async getPhotos() {
    this.photoService.getUserPhotos().subscribe(photos => this.photos = photos);
  }

  public async presentUploadModal() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'upload-photo auto-height', 
      backdropDismiss: false
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      this.getPhotos();

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
