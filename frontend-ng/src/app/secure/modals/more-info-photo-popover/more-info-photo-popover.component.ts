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

}
