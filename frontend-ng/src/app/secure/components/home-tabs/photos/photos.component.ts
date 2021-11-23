import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
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

  currentView: string = "compact";
  public fullView: boolean;
  public compactView: boolean = true;

  @Input() view: string;
  public photos: Photo[];
  currentRoute: string;
  constructor(
    private modalController: ModalController,
    private photoService: PhotoService, private tagService: TagService, private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute == "/home" && event.urlAfterRedirects === "/home") {
          this.getPhotos();
        }
        console.log(event);
      }
    });
  }

  ngOnInit() {
    this.getPhotos();
    console.log("View: " + this.view);
  }



  // Populate photos
  public getPhotos() {
    this.photoService.getUserPhotos().subscribe((photos: Photo[]) => this.photos = photos);
  }

  // Show upload photo dialog
  public async presentUploadModal() {
    const modal = await this.modalController.create({
      component: UploadPhotoComponent,
      cssClass: 'upload-photo auto-height',
      backdropDismiss: false,

    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      // Reload all photos
      this.getPhotos();

      console.log(res);
      if (res.data != undefined) {
        let tagName: string[] = res.data.tags;
        for (let i = 0; i < tagName.length; i++) {
          // Add tags to photo
          this.tagService.create({ title: tagName[i], photos: [res.data.photo.id] }).subscribe((res) => {
            console.log("Created tags");
            console.log(res)
          });
        }
      }
    });
  }

  // Single view
  goToSinglePhotoView(photo_id: number) {
    console.log("testing")
    this.router.navigate(['/photos', photo_id]);
  }



}
