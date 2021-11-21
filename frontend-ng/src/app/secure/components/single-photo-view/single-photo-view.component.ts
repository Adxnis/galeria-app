import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-single-photo-view',
  templateUrl: './single-photo-view.component.html',
  styleUrls: ['./single-photo-view.component.scss'],
})
export class SinglePhotoViewComponent implements OnInit {
  // @ViewChild("previous") previous: ElementRef;
  public photo_id: number;
  public photo: Photo;
  public user: User;
  public index: number;
  constructor(private route: ActivatedRoute, private router: Router, private photoService: PhotoService, private authService: AuthService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getUserPhotos();
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log("INDEX 1")
      console.log(this.index)
      let id = parseInt(params.get('id'));
      this.photo_id = id;

      if(this.index === 1) {
        console.log("NO");
        // (<HTMLInputElement> document.getElementById('previous')).disabled = true;
      }
    })



  }

  public goPrevious() {
    console.log(this.index);
    if(this.index != 0){
      let previousId = this.photo_id - 1;
      this.router.navigate(['/photos' , previousId])
    }

  }

  public goNext() {
    console.log("Next");
    if(this.user.photos.length != this.index+1){
      let nextId = this.photo_id + 1;
      this.router.navigate(['/photos' , nextId])
    }
 
  }

  public goBack() {
    this.photoService.getUserPhotos().subscribe();
    this.router.navigate(['/home'])
  }


  public getUserPhotos() {
    this.authService.user().subscribe((user: User) => {
      console.log(user);
      this.user = user;
      console.log(this.user.photos.findIndex(x => x.id === this.photo_id));
      if(this.index == 0) {
        // this.previous.nativeElement.disabled = true
      }
      this.index = this.user.photos.findIndex(x => x.id === this.photo_id);

    });

  }

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
            this.photoService.delete(this.photo_id).subscribe(()=>{
              console.log("deleted")
              this.getUserPhotos();
            });
            if(this.user.photos.length == 0){
              this.goBack();
            }
            if(this.index == 0){
              console.log("0")
              this.index = 1;
              this.goNext();
            }
            if(this.index == this.user.photos.length -1){
              console.log("Max")
              this.goPrevious();
            }
            else{

              this.goNext();
            }
            
          }
        },
        { text: 'No' }
      ]
    });
    await alert.present();
  }

}
