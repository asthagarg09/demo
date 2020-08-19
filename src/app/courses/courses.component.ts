import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import  {  HttpClient  }  from  '@angular/common/http';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  URL= "http://localhost/capstoneProject/php/upload.php";
  data = [];
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
     name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
     file:  new  FormControl('',  [Validators.required])
   });
 
  constructor(private httpClient:  HttpClient)  { 
      this.httpClient.get('http://localhost/capstoneProject/php/displayContent.php')
      .subscribe(data => {
        this.data.push(data);
        console.log(this.data);
      
      },
      error => console.error(error));

   }
 
   get f(){
      return  this.uploadForm.controls;
   }
 
  onFileChange(event)  {
     for  (var i =  0; i <  event.target.files.length; i++)  {  
         this.files.push(event.target.files[i]);
     }
   }
 
  submitForm(){
 
   const formData =  new  FormData();
   for  (var i =  0; i <  this.files.length; i++)  {  
       formData.append("file[]",  this.files[i]);
   } 
   formData.append("name", this.uploadForm.get('name').value);

 
   this.httpClient.post(this.URL, formData).subscribe(res =>  {
       console.log(res);
       alert('Files uploaded Successfully!');
   })
   }
}
