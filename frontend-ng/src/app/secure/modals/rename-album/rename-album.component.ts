import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { Album } from 'src/app/interfaces/album';
import { Photo } from 'src/app/interfaces/photo';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-rename-album',
  templateUrl: './rename-album.component.html',
  styleUrls: ['./rename-album.component.scss'],
})
export class RenameAlbumComponent implements OnInit {
  form: FormGroup;
  @Input() album: Album;
  photo_ids: number[] = [];
  constructor(private formBuilder: FormBuilder, private albumService: AlbumService, private modalController: ModalController) { 
 
  }

  ngOnInit(): void {
 
    this.form = this.formBuilder.group({
      album_name: this.album.album_name,
      photos: ''
    });
    this.getPhotosInAlbum();
  }

  public async submit(): Promise<void> {
    console.log(this.form.getRawValue());
    this.albumService.update(this.album.id,this.form.getRawValue()).subscribe((res: any) => {
      console.log(res);
      this.closeModal();
    })
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss();
  }
  public getPhotosInAlbum() {
    if(this.album){
      for(let i = 0; i < this.album.photos.length; i++){
        console.log(this.album.photos[i].id);
        this.photo_ids.push(this.album.photos[i].id);
      }
      this.form.patchValue({ 'photos': this.photo_ids})
    }
  }
}
