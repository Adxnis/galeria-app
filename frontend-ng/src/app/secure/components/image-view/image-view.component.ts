import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent implements OnInit {

  @Input() id: number = 0;
  public photo_id: number;
  public photo: Photo;
  public user: User;
  public photos? : Photo[];
  public index: number;
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  constructor(private authService: AuthService) { }


  ngOnInit() {
    console.log("Hey")
    this.getUserPhotos();
  }


  public async getUserPhotos() {
    this.authService.user().subscribe((user: User) => {
      console.log(user);
      this.user = user;
      this.photos = this.user.photos;
      this.index = this.photos.findIndex(x => x.id === this.id);
      console.log(this.index);
      console.log(this.user.photos[this.index].file_name)
    });

  }
}
