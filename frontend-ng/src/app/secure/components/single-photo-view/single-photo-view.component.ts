import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
import { Comment } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/user';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { MoreInfoPhotoPopoverComponent } from '../../modals/more-info-photo-popover/more-info-photo-popover.component';

@Component({
  selector: 'app-single-photo-view',
  templateUrl: './single-photo-view.component.html',
  styleUrls: ['./single-photo-view.component.scss'],
})
export class SinglePhotoViewComponent implements OnInit, OnDestroy {

  // Data information
  // ids
  public photo_id: number;

  // Objects
  public photos: Photo[];
  public comments: Comment[];
  public user: User;

  // Photo
  public index: number;
  public photo_liked: boolean = false;
  public total_photos: number;

  // form
  public form: FormGroup
  
  // album name
  public album_name: string;

  // subscriptions
  public photoSubcription$: Subscription
  public commentSubscription$: Subscription
  public likeSubscription$: Subscription
  public authSubscription$: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private authService: AuthService,
    private commentService: CommentService,
    private likeService: LikeService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController) { }

  ngOnInit() {
    // intialize form
    this.form = this.formBuilder.group({
      photo_id: this?.photo_id,
      user_id: '',
      username: '',
      body: ''
    });

    // get all photos from user
    this.getUserPhotos();

    // get id from route url
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.photo_id = id;
      this.getUserPhotos();
    });

  }

  ngOnDestroy() {
    if(this.authSubscription$ != null){
      this.authSubscription$.unsubscribe();
    }

    if(this.likeSubscription$ != null) {
      this.likeSubscription$.unsubscribe();
    }

    if(this.photoSubcription$ != null) {
      this.photoSubcription$.unsubscribe();
    }

    if(this.commentSubscription$ != null) {
      this.commentSubscription$.unsubscribe();
    }
  }

  // Go to previous photo
  public goPrevious() {
    if (this.index != 0) {
      let previousId = this.photos[this.index - 1].id;
      this.router.navigate(['/photos', previousId]);
    }
  }

  // Go to next photo unless photo is the last one
  public goNext() {
    if (this.index != this.photos.length - 1) {
      let nextId = this.photos[this.index + 1].id;
      this.router.navigate(['/photos', nextId])
    }
    else {
      this.goBack();
    }
  }

  // return to all photos
  public goBack() {
    this.router.navigate(['/home'])
  }

  // Get all users photos
  public getUserPhotos() {
    this.authSubscription$ = this.authService.user().subscribe((user: User) => {
      this.photos = user.photos;
      this.total_photos = user.total_photos;
      this.user = user;
      this.index = this.photos.findIndex(x => x.id === this.photo_id);
      this.album_name = this.user.photos[this.index].name;

      // if user has liked this photo show it
      const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
      if (liked) {
        this.photo_liked = true;
      };
    })
  };

  // get photo
  public getPhotoById(id: number) {
    this.photoSubcription$ = this.photoService.get(id).subscribe((res: any) => {
      this.photos[this.index] = res;
    });
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
            this.photoSubcription$ = this.photoService.delete(this.photo_id).subscribe(() => {
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
    this.commentSubscription$ = this.commentService.create(this.form.getRawValue()).subscribe(() => {
      this.getUserPhotos();
    });
  }

  // delete comment
  public deleteComment(id: number): void {
    this.commentSubscription$ = this.commentService.delete(id).subscribe(() => {
      this.getUserPhotos();
    })
  }

  // like photo if not liked
  public likePhoto(index: number): void {
    const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
    if (liked) {
      this.likeSubscription$ = this.likeService.delete(this.user.id).subscribe((res: any) => {
        this.getPhotoById(this.photo_id);
        this.photo_liked = false;
      });
    }
    else {
      this.likeSubscription$ = this.likeService.create({ user_id: this.user.id, photo_id: this.photos[index].id }).subscribe(() => {
        this.getPhotoById(this.photo_id);
        this.photo_liked = true;
      })
    }
  }

  // zoom in photo
  public zoomInPhoto(): any {
    var myImg = document.getElementById("image");
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500) return false;
    else {
      myImg.style.width = (currWidth + 100) + "px";
    }
  }

  // zoom out photo
  public zoomOutPhoto(): any {
    var myImg = document.getElementById("image");
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
      myImg.style.width = (currWidth - 100) + "px";
    }
  }

  // update album name
  public updateAlbumName(): void {
    this.photoSubcription$ = this.photoService.update(this.photo_id, { name: this.album_name }).subscribe((res) => {
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
}
