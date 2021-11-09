import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  @Output() uploaded = new EventEmitter<string[]>();

  constructor(private http:HttpClient) { }

  ngOnInit() {}

  upload(fileChangeEvent){
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];

    // Create a form data object using the FormData API
    let formData = new FormData();

    // Add the file that was just added to the form data
    formData.append("image", photo, photo.name);

    // POST formData to server using HttpClient
    this.http.post(`${environment.api}/upload`, formData, {withCredentials: true  }).subscribe((res:any) => {
      // this.uploaded.emit([res.url, photo.name,photo.name, photo.dateLastModified]);
      console.log(res);
      console.log(photo);
    });
    
    
  }

}