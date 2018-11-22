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
      contrasena:["",Validators.required],
    })
 
    this.loginForm=fb.group({
     contrasena:["",Validators.required],
     email:["",Validators.required],
    })
 
 
   }
 
   ngOnInit() {
   
  //metodo registro
  // Tiene que llamar al servicio de auth
  // al servicio de usuarios 
  // implementar un router 
     
  
   
   }
 
  
 
    
 
   addUser() {
     console.log("Form", this.usuarioForm.value)
  
     this.authservice.addUser(this.usuarioForm.value.email, this.usuarioForm.value.contrasena, this.usuarioForm.value.nombre);

     this.usuarioForm.reset();

   }
 
   IniciarSesion(){
     
     this.authservice.signIn(this.loginForm.value.email, this.loginForm.value.contrasena);

     var User= this.afAuth.auth.currentUser;

     console.log(User +" CONSOLE LOG")
 
   }
 
   resetform(){
     this.usuarioForm.reset();
   }
   
       
   
 
     
   }
