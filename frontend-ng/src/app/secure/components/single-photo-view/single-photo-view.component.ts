import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-single-photo-view',
  templateUrl: './single-photo-view.component.html',
  styleUrls: ['./single-photo-view.component.scss'],
})
export class SinglePhotoViewComponent implements OnInit {

  public photo_id;
  constructor(private route: ActivatedRoute, private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
    console.log("Hey")
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.photo_id = id;
    this.photoService.get(this.photo_id).subscribe((res) => {
      console.log(res)
    });
  }

  goPrevious() {
    let previousId = this.photo_id - 1;
    this.router.navigate(['home/photos' , previousId])
  }

  goNext() {
    let nextId = this.photo_id + 1;
    this.router.navigate(['home/photos' , nextId])
  }

}
