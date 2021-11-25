import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Album } from 'src/app/interfaces/album';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AlbumService } from 'src/app/services/album.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { DiscoveryService } from 'src/app/services/discovery.service';
import { LikeService } from 'src/app/services/like.service';
import { PhotoService } from 'src/app/services/photo.service';
import { MoreInfoPhotoPopoverComponent } from '../../modals/more-info-photo-popover/more-info-photo-popover.component';

@Component({
  selector: 'app-discover-single-photo-view',
  templateUrl: './discover-single-photo-view.component.html',
  styleUrls: ['./discover-single-photo-view.component.scss'],
})
export class DiscoverSinglePhotoViewComponent implements OnInit {

  // Data information
  // ids
  public photo_id: number;
  public album_id: number;
  public user_id: number;
  // Objects
  public photos: Photo[];
  public user: User;
  public album: Album;

  // photo
  public total_photos: number;
  public photo_liked: boolean = false;
  public photo_name: string;

  public index: number;
  // Reactive form
  public form: FormGroup


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private authService: AuthService,
    private commentService: CommentService,
    private discoverService: DiscoveryService,
    private likeService: LikeService,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      photo_id: this?.photo_id,
      user_id: '',
      username: '',
      body: ''
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.photo_id = id;
      this.authService.user().subscribe((user: User) => { this.user = user; this.user_id = user.id });
      this.getAllPublicPhotos();
    });
  }

  // Get all users photos
  public getAllPublicPhotos() {
    this.discoverService.all().subscribe((photos: Photo[]) => {
      this.photos = photos;
      this.total_photos = this.photos.length;
      this.index = this.photos.findIndex(x => x.id === this.photo_id);
      this.photo_name = this.photos[this.index].name;
      const liked = this.photos[this.index].likes.some(el => el.user_id === this.user.id);
      if (liked) {
        this.photo_liked = true;
      };
    })
  };

  // Go to previous photo
  public goPrevious() {
    if (this.index != 0) {
      let previousId = this.photos[this.index - 1].id;
      this.router.navigate([`discover/photos`, previousId]);
    }
  }

  // Go to next photo unless photo is the last one
  public goNext() {
    if (this.index != this.photos.length - 1) {
      let nextId = this.photos[this.index + 1].id;
      this.router.navigate([`discover/photos`, nextId]);
    }
    else {
      this.goBack();
    }
  }

  // return to all photos
  public goBack() {
    this.router.navigate([`/discover`])
  }

  public getPhotoById(id: number) {
    this.photoService.get(id).subscribe((res: any) => {
      this.photos[this.index] = res;
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

    // Create new comment
    public addNewComment(): void {
      this.form.patchValue({ 'user_id': this.user.id, 'photo_id': this.photo_id, 'username': this.user.username })
      this.commentService.create(this.form.getRawValue()).subscribe(() => {
        this.getAllPublicPhotos();
      });
    }

  // Delete comment
  public deleteComment(id: number): void {
    this.commentService.delete(id).subscribe(() => {
      this.getAllPublicPhotos();
    })
  }



}
