import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import {  Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuarios=[];
  nombre:string;
  apellido:string;
  email:string;
  contrasena:string;
 
 
  usuarioForm:FormGroup;
  loginForm:FormGroup;
 
   constructor(public authservice:AuthService, public router:Router, private fb: FormBuilder, private afAuth: AngularFireAuth) { 

    this.usuarioForm=fb.group({
      nombre:["",Validators.required],
      apellido:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
 
    this.loginForm=fb.group({
     password:["",Validators.required],
     email:["",Validators.required],
    })
 
 
   }
 
   ngOnInit() {
   
   }
 
   addUser() {
     console.log("Form", this.usuarioForm.value);
  
     this.authservice.addUser(this.usuarioForm.value);

     this.usuarioForm.reset();

   }
 
   IniciarSesion(){
     
     this.authservice.signIn(this.loginForm.value);

     var User= this.afAuth.auth.currentUser;
 
   }
 
   resetform(){
     this.usuarioForm.reset();
   }
   
       
   
 
     
   }
