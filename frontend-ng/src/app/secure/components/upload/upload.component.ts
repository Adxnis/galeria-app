import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
////////////////////////////////
////// This component receives information from uploaded photo and sends it back to the upload photo form
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  
  @Output() uploaded = new EventEmitter<string[]>();

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  public upload(fileChangeEvent) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];

    console.log(fileChangeEvent.target.files[0].size);
    if(fileChangeEvent.target.files[0].size < 2000000) {
      console.log("in here")
          // Create a form data object using the FormData API
          let formData = new FormData();

          // Add the file that was just added to the form data
          formData.append("image", photo, photo.name);

          // POST formData to server using HttpClient
          this.http.post(`${environment.api}/upload`, formData, { withCredentials: true }).subscribe((res: any) => {

          this.uploaded.emit([res.url, photo.type.split("/")[1], photo.size]);

    });
    }
  }

  ok() {
    console.log("PL")
  }
}
