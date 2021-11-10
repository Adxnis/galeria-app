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
      
      this.uploaded.emit([res.url, photo.type.split("/")[1], photo.size]);
      console.log(res);
      console.log(photo);
    });
    
    
  }

   convert(value){

    // Unixtimestamp
    var unixtimestamp = value
   
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Hours
    var hours = date.getHours();
   
    // Minutes
    var minutes = "0" + date.getMinutes();
   
    // Seconds
    var seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime;
    
   }

}
