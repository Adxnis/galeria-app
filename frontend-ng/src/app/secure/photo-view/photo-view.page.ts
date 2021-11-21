import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.page.html',
  styleUrls: ['./photo-view.page.scss'],
})
export class PhotoViewPage implements OnInit {
  
  public photo_id: number;
  public photo: Photo;
  public user: User;
  public photos? : Photo[];
  public index: number;

  constructor(private route: ActivatedRoute, private router: Router, private photoService: PhotoService, private authService: AuthService) { }

  ngOnInit() {
    // this.getUserPhotos();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.photo_id = id;
      // this.getPhoto(this.photo_id);

    })
  }

  public goPrevious() {
    let previousId = this.photo_id - 1;
    this.router.navigate(['/home' , previousId])
  }

  public goNext() {
    console.log("Next");
    let nextId = this.photo_id + 1;
    this.router.navigate(['/home' , nextId])
  }

  public goBack() {
    this.router.navigate(['/home'])
  }

  // public async getPhoto(id: number) {
  //   this.photoService.get(id).subscribe((photo: Photo) => {
  //     console.log(photo)
  //     this.photo = photo;
  //   });
  // }

  // public async getUserPhotos() {
  //   this.authService.user().subscribe((user: User) => {
  //     console.log(user);
  //     this.user = user;
  //     this.photos = this.user.photos;
  //     console.log(this.photos.findIndex(x => x.id === this.photo_id));
  //     this.index = this.photos.findIndex(x => x.id === this.photo_id) + 1;
  //     console.log(this.index);
  //   });

  // }


}
