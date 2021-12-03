import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/interfaces/album';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AlbumService } from 'src/app/services/album.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { PhotoService } from 'src/app/services/photo.service';
import { MoreInfoPhotoPopoverComponent } from '../../modals/more-info-photo-popover/more-info-photo-popover.component';

@Component({
  selector: 'app-album-single-photo-view',
  templateUrl: './album-single-photo-view.component.html',
  styleUrls: ['./album-single-photo-view.component.scss'],
})
export class AlbumSinglePhotoViewComponent implements OnInit {

  // Data information
  // ids
  public photo_id: number;
  public album_id: number;
  public user_id: number;

  // Objects
  public photos: Photo[];
  public user: User;

  // Photo
  public index: number;
  public total_photos: number;
  public photo_liked: boolean = false;
  public photo_name: string;

  // form
  public form: FormGroup;

  // album
  public album: Album;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private authService: AuthService,
    private commentService: CommentService,
    private likeService: LikeService,
    private albumService: AlbumService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController) { }

  ngOnInit() {
    // initialize form
    this.form = this.formBuilder.group({
      photo_id: this?.photo_id,
      user_id: '',
      username: '',
      body: ''
    });


    // ids from url 
    this.album_id = parseInt(this.route.snapshot.paramMap.get('id1'));
    this.photo_id = parseInt(this.route.snapshot.paramMap.get('id2'));



    // get user and get photos from album
    this.authService.user().subscribe((user: User) => { this.user = user; this.user_id = user.id });
    this.getAlbumPhotos();
  }


  // delete confirmation alert
  public async deletePhoto() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: '<div>Are you sure you want to delete this photo?</div>',
      backdropDismiss: false,
      animated: false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.photoService.delete(this.photo_id).subscribe(() => {
              if (this.index == this.photos.length - 1 && this.index != 0) {
                this.goPrevious();
              }
              else {
                this.goNext();
              }
            });
          }
        },
        { text: 'No' }
      ]
    });
    await alert.present();
  }

  // Create new comment
  public addNewComment(): void {
    this.form.patchValue({ 'user_id': this.user.id, 'photo_id': this.photo_id, 'username': this.user.username })
    this.commentService.create(this.form.getRawValue()).subscribe(() => {
      this.getAlbumPhotos();
    });
  }

  // delete comment
  public deleteComment(id: number): void {
    this.commentService.delete(id).subscribe(() => {
      this.getAlbumPhotos();
    })
  }

  // like photo if not liked
  public likePhoto(index: number): void {
    const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
    if (liked) {
      this.likeService.delete(this.user.id).subscribe((res: any) => {
        this.getPhotoById(this.photo_id);
        this.photo_liked = false;
      });
    }
    else {
      this.likeService.create({ user_id: this.user.id, photo_id: this.photos[index].id }).subscribe(() => {
        this.getPhotoById(this.photo_id);
        this.photo_liked = true;
      })
    }
  }

  public zoomInPhoto(): any {
    var myImg = document.getElementById("image");
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500) return false;
    else {
      myImg.style.width = (currWidth + 100) + "px";
    }
  }

  public zoomOutPhoto(): any {
    var myImg = document.getElementById("image");
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
      myImg.style.width = (currWidth - 100) + "px";
    }
  }

  public updatePhotoName(): void {
    this.photoService.update(this.photo_id, { name: this.photo_name }).subscribe((res) => {
      this.getPhotoById(this.photo_id);
    });

  }

  public async moreInfo(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: MoreInfoPhotoPopoverComponent,
      translucent: true,
      event: ev,
      showBackdrop: false,
      animated: false,
      cssClass: 'view-menu',
      componentProps: { photo: this.photos[this.index] }
    });
    await popover.present();
  }


  // Go to previous photo
  public goPrevious() {
    if (this.index != 0) {
      let previousId = this.photos[this.index - 1].id;
      this.router.navigate([`album/${this.album_id}/photo`, previousId]);
    }
  }

  // Go to next photo unless photo is the last one
  public goNext() {
    if (this.index != this.photos.length - 1) {
      let nextId = this.photos[this.index + 1].id;
      this.router.navigate([`album/${this.album_id}/photo`, nextId]);
    }
    else {
      this.goBack();
    }
  }

  // return to all photos
  public goBack() {
    this.router.navigate([`album/${this.album_id}/`])
  }

  public getAlbumPhotos() {
    this.albumService.get(this.album_id).subscribe((album: Album) => {
      this.album = album;
      this.photos = album.photos;
      this.index = this.photos.findIndex(x => x.id === this.photo_id);

      this.photo_name = this.photos[this.index].name;
      this.total_photos = this.album.total_photos;

      const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);

      if (liked) {
        this.photo_liked = true;
      };
    });
  }

  // get photo 
  public getPhotoById(id: number) {
    this.photoService.get(id).subscribe((res: any) => {
      this.photos[this.index] = res;
    });
  }
}
