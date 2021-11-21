import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
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
  currentRoute: string;
  constructor(
    private modalController: ModalController,
    private photoService: PhotoService, private tagService: TagService, private router: Router) {
      this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            this.getPhotos();
            console.log('Route change detected');
        }

        if (event instanceof NavigationEnd) {
            // Hide progress spinner or progress bar
            this.currentRoute = event.url;          
            console.log(event);
        }

        if (event instanceof NavigationError) {
             // Hide progress spinner or progress bar

            // Present error to user
            console.log(event.error);
        }
     })
  }

  ngOnInit() { 
    console.log("hey")
    this.getPhotos();
  }

  ngonChanges(changes: SimpleChanges){
    console.log("JSNS")
  }

  // Populate photos
  public async getPhotos() {
    this.photoService.getUserPhotos().subscribe(photos => this.photos = photos);
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
        for(let i=0; i < tagName.length; i++) {
          // Add tags to photo
          this.tagService.create({title: tagName[i], photos: [res.data.photo.id]}).subscribe((res) => 
            {
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
