import { Component, OnInit, ViewChild } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: User;
  public photos: Photo[];
  public mostLikedPhoto: Photo;
  public mostCommentedPhoto: Photo;
  public first_name: string;
  public last_name: string;
  public username: string;
  public email: string;
  public location: string;
  public profile_picture: string;

  public hidePictures: boolean = false;
  @ViewChild('toggle') toggle: IonToggle;

  constructor(private authService: AuthService, private photoService: PhotoService) { }

  ngOnInit() {
    this.authService.user().subscribe((user: User) => {
      this.user = user;
      this.first_name = user?.first_name;
      this.last_name = user?.last_name;
      this.username = user?.username;
      this.location = user?.location;
      this.profile_picture = user?.profile_picture;
      this.email = user?.email;
    });
    this.photoService.getUserPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
      console.log(this.photos);
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

  // public updateAlbumName(): void {
  //   console.log(this.album_name)
  //   this.photoService.update(this.photo_id, {name: this.album_name}).subscribe((res) => {
  //     console.log(res);
  //     this.getPhotoById(this.photo_id);
  //   });
    
  // }
  updateFirstName() {
    this.authService.updateInfo({first_name: this.first_name}).subscribe((res) => {
      console.log(res);

    });
  }

  updateLastName() {

  }

  updateUsername() {

  }

  updateEmail() {

  }

  updateLocation() {

  }

  updateInfo() {

  }






}
