import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, AlertController, NavParams, PopoverController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { Photo } from 'src/app/interfaces/photo';
import { User } from 'src/app/interfaces/user';
import { AlbumService } from 'src/app/services/album.service';
import { SharedAlbumService } from 'src/app/services/shared-album.service';
import { TagService } from 'src/app/services/tag.service';
import { ShareWithUserComponent } from '../share-with-user/share-with-user.component';
import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';

@Component({
  selector: 'app-create-new-shared-album',
  templateUrl: './create-new-shared-album.component.html',
  styleUrls: ['./create-new-shared-album.component.scss'],
})
export class CreateNewSharedAlbumComponent implements OnInit {
  form: FormGroup;
  sharedUser: User;
  @Input() albumPage: boolean;
  public image: string;
  public photo: Photo;
  
  constructor(
    private modalController: ModalController, 
    private alertCtrl: AlertController, 
    private navParams: NavParams, 
    private albumService: AlbumService, 
    private sharedAlbumService: SharedAlbumService,
    private formBuilder: FormBuilder, 
    private tagService: TagService,
    private popoverController: PopoverController) { }

    ngOnInit() {
      this.form = this.formBuilder.group({
        album_name: '',
        isShared: false
      });
      this.image = this.navParams.data.image

    }

    

    public createAlbum(): void {
      console.log(this.form.getRawValue())
  
      console.log("ID" + this.sharedUser.id);
      this.albumService.create(this.form.getRawValue()).subscribe((res) => {
        console.log(res);
        this.sharedAlbumService.create({shared_person_id: this.sharedUser.id, album_id: res.id}).subscribe((res) => {
          console.log("SHARED ALBUM CREATED");
          console.log(res);
        })
        this.modalController.dismiss({album_id: res.id, shared_person_id: this.sharedUser.id, isShared: res.isShared, photo: this.photo});
      });
    }

    public async uploadPhoto() {
      const modal = await this.modalController.create({
        component: UploadPhotoComponent,
        cssClass: 'upload-photo auto-height', 
        backdropDismiss: false,
        componentProps: {albumPage: this.albumPage}
        
      });
      await modal.present();
      modal.onDidDismiss().then((res) => {
        
  
        if (res.data != undefined) {      
          console.log(res);
          console.log(res.data.tags);
          let tagName: string[] = res.data.tags;
          this.photo = res.data.photo;
          this.image = this.photo.file_name;
          console.log(tagName.length);
          console.log(this.photo.id)
          for(let i=0; i < tagName.length; i++) {
            this.tagService.create({title: tagName[i], photos: [this.photo.id]}).subscribe(res => {console.log(res)});
          }
  
        }      
      });
    }

    public async presentShareWithUserPopover() {
      const popover = await this.popoverController.create({
        component: ShareWithUserComponent,
        cssClass: 'share-with-user', 
        backdropDismiss: false,        
      });
      await popover.present();
      await popover.onDidDismiss().then((res) => {
        console.log("IVE BEEN DISMISSED");
       
        if( res.data != undefined) {
          this.sharedUser = res.data;
          this.form.patchValue({'isShared': 1});
        }
        console.log(res);
      })
    }

    async cancel() {
      const alert = await this.alertCtrl.create({
        header: 'Warning',
        message: '<div>Are you sure you want to exit?</div>',
        backdropDismiss: false,
        animated: false,
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.modalController.dismiss();
            }
          },
          { text: 'No' }
        ]
      });
      await alert.present();
    }
  

}
