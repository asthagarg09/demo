import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import  {  HttpClient  }  from  '@angular/common/http';


@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent {

  URL= "http://localhost/capstoneProject/php/quiz.php";
  data = [];
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
     name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
     filename:  new  FormControl('',  [Validators.required]),
     status: new FormControl('',  [Validators.required])
   });
 
  constructor(private httpClient:  HttpClient)  { 
      this.httpClient.get('http://localhost/capstoneProject/php/displayquiz.php')
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
   Visible = new FormControl();
    onChange() {
      console.log(this.Visible.value);
      var stat=this.Visible.value;
    } 
 
  submitForm(){
 
   const formData =  new  FormData();
   for  (var i =  0; i <  this.files.length; i++)  {  
       formData.append("file[]",  this.files[i]);
   } 
   formData.append("name", this.uploadForm.get('name').value);
   formData.append("status", this.uploadForm.get('status').value);

 
   this.httpClient.post(this.URL, formData).subscribe(res =>  {
       console.log(res);
       alert('Files uploaded Successfully!');
   })
   }

}
