import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';
import { UploadPhotoComponent } from '../../../../secure/modals/upload-photo/upload-photo.component';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {


  photos: Photo[] = [

  ];
  
  constructor(private modalController: ModalController, private http:HttpClient, private photoService: PhotoService) { }

  ngOnInit() { 
    this.getPhotos();

  }

  getPhotos() {
    this.photoService.getUserPhotos()
    .pipe(
      map(response => response),
      tap(photos => console.log("photos array", photos))
      ).subscribe(photos => this.photos = photos);
  }

  public async presentUploadModal() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'upload-photo auto-height', 
      backdropDismiss: false
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.getPhotos();
    });

  }

}
