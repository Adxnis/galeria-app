import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
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

  public photo_id: number;
  public album_id: number;
  public photos: Photo[];
  public user: User;
  public user_id: number;

  public index: number;
  public total_photos: number;
  public form: FormGroup;
  // public comments: Comment[];
  public photo_liked: boolean = false;
  public photo_name: string;
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
    this.form = this.formBuilder.group({
      photo_id: this?.photo_id,
      user_id: '',
      username: '',
      body: ''
    });

    
    this.album_id = parseInt(this.route.snapshot.paramMap.get('id1'));
    this.photo_id = parseInt(this.route.snapshot.paramMap.get('id2'));


  
    this.authService.user().subscribe((user: User) => {this.user = user; this.user_id = user.id});
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
              console.log("deleted");
              console.log("INDEX before: " + this.index)
              // this.getAlbumPhotos();
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
      this.getAlbumPhotos();
    });
  }

  public deleteComment(id: number): void {
    this.commentService.delete(id).subscribe(() => {
      this.getAlbumPhotos();
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

  public updatePhotoName(): void {
    console.log(this.photo_name)
    this.photoService.update(this.photo_id, {name: this.photo_name}).subscribe((res) => {
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


    // Go to previous photo
    public goPrevious() {
      console.log(this.index);
      if (this.index != 0) {
        let previousId = this.photos[this.index - 1].id;
        this.router.navigate([`album/${this.album_id}/photo`, previousId]);
      }
    }
  
    // Go to next photo unless photo is the last one
    public goNext() {
      if (this.index != this.photos.length - 1) {
        console.log("Next");
        console.log(this.index);
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
        console.log("Photos");
        console.log(this.photos);

        this.index = this.photos.findIndex(x => x.id === this.photo_id);
        this.photo_name = this.photos[this.index].name;
        this.total_photos = this.album.total_photos;
        const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
        if (liked) {
          this.photo_liked = true;
        };

        console.log("Index: " + this.index); 
      });
    }

    public getPhotoById(id: number) {
      this.photoService.get(id).subscribe((res: any) => {
        this.photos[this.index] = res;
      });
    }



}
