import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { DiscoveryService } from 'src/app/services/discovery.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AddProfilePictureComponent } from '../modals/add-profile-picture/add-profile-picture.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  // objects
  public user: User;
  public photos: Photo[];
  public mostLikedPhoto: Photo;
  public mostCommentedPhoto: Photo;

  // user data 
  public first_name: string;
  public last_name: string;
  public username: string;
  public email: string;
  public location: string;
  public profile_picture: string;

  public hidePictures: boolean = false;

  currentRoute: string;

  // subscriptions
  authSubscription$: Subscription
  photoSubscription$: Subscription
  discoverySubscription$: Subscription

  constructor(
    private authService: AuthService, 
    private photoService: PhotoService, 
    private discoveryService: DiscoveryService, 
    private modalController: ModalController, 
    private router: Router) { 
        // only get photos if url matches
        this.currentRoute = "";
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            if (this.currentRoute == "/profile" && event.urlAfterRedirects === "/profile") {
              this.getUser();
            }
          }
        });
  }

  // get information about user and their photos
  ngOnInit() {
    this.getUser();

    this.photoSubscription$ = this.photoService.getUserPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
      for(let i = 0; i < photos.length; i++) {
        if(photos[i].isPublic == null || photos[i].isPublic == false) {
          this.hidePictures = true;
        }
        if(photos[i].isPublic == true) {
          this.hidePictures = false;
        }
      }

      // Get most commented and most liked photo by sorting photos list
      if (this.photos) {
        this.photos = this.photos.sort((a, b) => {
          return b.comments.length - a.comments.length;
        })
        this.mostCommentedPhoto = this.photos[0];

        this.photos = this.photos.sort((a, b) => {
          return b.likes.length - a.likes.length;
        })

        this.mostLikedPhoto = this.photos[0];
      }
    })
  }

  // unsubscribe
  ngOnDestroy() {
    this.authSubscription$.unsubscribe();
    this.discoverySubscription$.unsubscribe();
    this.photoSubscription$.unsubscribe();
  }

  getUser() {
    this.authSubscription$ = this.authService.user().subscribe((user: User) => {
      this.user = user;
      this.first_name = user?.first_name;
      this.last_name = user?.last_name;
      this.username = user?.username;
      this.location = user?.location;
      this.profile_picture = user?.profile_picture;
      this.email = user?.email;
    });
  }

  // update first name 
  updateFirstName() {
    this.authSubscription$ = this.authService.updateInfo({first_name: this.first_name}).subscribe();
  }

  // update last name 
  updateLastName() {
    this.authSubscription$ = this.authService.updateInfo({last_name: this.last_name}).subscribe();
  }

  // update username
  updateUsername() {
    this.authSubscription$ = this.authService.updateInfo({username: this.username}).subscribe();
  }

  // update email
  updateEmail() {
    this.authSubscription$ = this.authService.updateInfo({email: this.email}).subscribe();
  }

  // update location
  updateLocation() {
    this.authSubscription$ = this.authService.updateInfo({location: this.location}).subscribe();
  }

  // Hide or show photos from discover
  toggleDiscoverPhotos() {
    if(this.hidePictures) {
      this.discoverySubscription$ = this.discoveryService.hidePhotos().subscribe();
    } else {
      this.discoverySubscription$ = this.discoveryService.showPhotos().subscribe();
    }
  }

  // Show change profile picture dialog
  public async presentProfilePictureModal() {
    const modal = await this.modalController.create({
      component: AddProfilePictureComponent,
      cssClass: 'create-album-2 auto-height',
      componentProps: { albumPage: true }
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      this.authService.updateInfo({profile_picture: res.data}).subscribe(() => {
        this.getUser();
      });
    })
  }
}
