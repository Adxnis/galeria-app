import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
import { Comment } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/user';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';

import { AlertController, PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { AlbumService } from 'src/app/services/album.service';
import { LikeService } from 'src/app/services/like.service';
import { MoreInfoPhotoPopoverComponent } from '../../modals/more-info-photo-popover/more-info-photo-popover.component';

@Component({
  selector: 'app-single-photo-view',
  templateUrl: './single-photo-view.component.html',
  styleUrls: ['./single-photo-view.component.scss'],
})
export class SinglePhotoViewComponent implements OnInit {
  public photo_id: number;
  public photos: Photo[];
  public user: User;
  public index: number;
  public total_photos: number;
  public form: FormGroup;
  public comments: Comment[];
  public photo_liked: boolean = false;
  public album_name: string;
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
    this.form = this.formBuilder.group({
      photo_id: this?.photo_id,
      user_id: '',
      username: '',
      body: ''
    });

    this.getUserPhotos();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.photo_id = id;
      this.getUserPhotos();
    });

  }

  // Go to previous photo
  public goPrevious() {
    console.log(this.index);
    if (this.index != 0) {
      let previousId = this.photos[this.index - 1].id;
      this.router.navigate(['/photos', previousId]);
    }
  }

  // Go to next photo unless photo is the last one
  public goNext() {
    if (this.index != this.photos.length - 1) {
      console.log("Next");
      console.log(this.index);
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

  public commentSection() { }


  // Get all users photos
  public getUserPhotos() {
    this.authService.user().subscribe((user: User) => {
      this.photos = user.photos;
      this.total_photos = user.total_photos;
      this.user = user;
      this.index = this.photos.findIndex(x => x.id === this.photo_id);
      this.album_name = this.user.photos[this.index].name;
      const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
      if (liked) {
        console.log("I like this picture")
        this.photo_liked = true;
      };
    })
  };

  public getPhotoById(id: number) {
    this.photoService.get(id).subscribe((res: any) => {
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
            this.photoService.delete(this.photo_id).subscribe(() => {
              console.log("deleted");
              console.log("INDEX before: " + this.index)
              // this.getUserPhotos();
              console.log("INDEX AFTEr: " + this.index)
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
    console.log("UserId = " + this.user.id);
    console.log("photoId = " + this.photo_id);
    this.form.patchValue({ 'user_id': this.user.id, 'photo_id': this.photo_id, 'username': this.user.username })
    console.log(this.form.getRawValue());
    this.commentService.create(this.form.getRawValue()).subscribe(() => {
      this.getUserPhotos();
    });
  }

  public deleteComment(id: number): void {
    this.commentService.delete(id).subscribe(() => {
      this.getUserPhotos();
    })
  }

  public likePhoto(index: number): void {
    console.log(this.user);
    console.log(this.photos[this.index]);
    console.log(this.photos[this.index].likes.indexOf(this.user.id))
    const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
    if (liked) {
      this.likeService.delete(this.user.id).subscribe((res: any) => {
        this.getPhotoById(this.photo_id);
        this.photo_liked = false;
      });
    }
    else {
      console.log(this.user.id, this.photos[index].id )
      this.likeService.create({ user_id: this.user.id, photo_id: this.photos[index].id }).subscribe(() => {
        console.log("Created");
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

  public updateAlbumName(): void {
    console.log(this.album_name)
    this.photoService.update(this.photo_id, {name: this.album_name}).subscribe((res) => {
      console.log(res);
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
      componentProps: {photo: this.photos[this.index]}
    });
    await popover.present();
  }



}
