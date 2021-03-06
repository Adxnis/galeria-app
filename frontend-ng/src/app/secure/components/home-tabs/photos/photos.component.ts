import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { TagService } from 'src/app/services/tag.service';
import { UploadPhotoComponent } from '../../../../secure/modals/upload-photo/upload-photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit, OnDestroy {

  currentView: string = "compact";

  // Data to receive from parent component (homepage)
  @Input() view: string;
  @Input() sort: string;

  public photos: Photo[];
  public photo_size: number;
  currentRoute: string;

  // subscriptions
  photoSubscription$: Subscription;
  tagSubscription$: Subscription;

  constructor(
    private modalController: ModalController,
    private photoService: PhotoService, 
    private tagService: TagService, 
    private router: Router) {
    
    // only get photos if url matches
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute == "/home" && event.urlAfterRedirects === "/home") {
          this.getPhotos();
        }
      }
    });
  }

  // populate view with photos 
  ngOnInit() {
    this.getPhotos();
  }

  // unsubscribe 
  ngOnDestroy() {
    if(this.photoSubscription$ != null) {
      this.photoSubscription$.unsubscribe();
    }
  }

  // sort pictures by name, size or date
  ngOnChanges(changes: SimpleChanges) {
    if(this.photos != undefined) {
      if (changes?.sort?.currentValue === "sortbysize") {
        this.photos = this.photos.sort((a, b) => {
          return parseInt(b.size) - parseInt(a.size);
        });
      }

      if (changes?.sort?.currentValue === "sortbydate") {
        this.photos = this.photos.sort((a, b) => {
          let da = a.created_at,
          db = b.created_at;
          if(da < db) {
            return -1;
          }
          if (da > db) {
            return 1;
          }
          return 0;
        });
      }
      if (changes?.sort?.currentValue === "sortbyname") {
        this.photos = this.photos.sort((a, b) => {
          
          let na = a.name.toLowerCase(),
              nb = b.name.toLowerCase();
            if(na < nb) {
              return -1;
            }
            if (na > nb) {
              return 1;
            }
            return 0;
        });
      }

    }
  }

  // Populate photos
  public getPhotos() {
    this.photoSubscription$ = this.photoService.getUserPhotos().subscribe((photos: Photo[]) => 
    {
      this.photos = photos;
    });
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

      if (res.data != undefined) {
        let tagName: string[] = res.data.tags;
        for (let i = 0; i < tagName.length; i++) {
          // Add tags to photo
          this.tagService.create({ title: tagName[i], photos: [res.data.photo.id] }).subscribe();
        }
      }
    });
  }

  // Single view
  goToSinglePhotoView(photo_id: number) {
    this.router.navigate(['/photos', photo_id]);
  }

  // convert bytes to MB
  getPhotoSize(bytes: string) {
    let size: number = parseInt(bytes);
    return size / 1000000
  }
}
