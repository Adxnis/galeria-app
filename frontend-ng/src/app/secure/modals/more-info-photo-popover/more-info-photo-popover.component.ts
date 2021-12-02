import { Component, Input, OnInit } from '@angular/core';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-more-info-photo-popover',
  templateUrl: './more-info-photo-popover.component.html',
  styleUrls: ['./more-info-photo-popover.component.scss'],
})
export class MoreInfoPhotoPopoverComponent implements OnInit {

  @Input() photo: Photo;
  constructor() { }

  ngOnInit() {}
  // convert bytes to MB
  getPhotoSize(bytes: string) {
    let size: number = parseInt(bytes);
    return size / 1000000
  }
}
