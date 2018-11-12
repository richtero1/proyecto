import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import {  Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  
     this.afAuth.auth.createUserWithEmailAndPassword(this.usuarioForm.value.email,this.usuarioForm.value.contrasena).then(user=>{
       user.user.updateProfile({displayName: this.usuarioForm.value.nombre, photoURL:"null"})
     }).catch(err=> console.log(err.message));
     this.usuarioForm.reset();

     
     
   }
 
   IniciarSesion(){
     
     
     this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.contrasena).then((res)=>{
      this.router.navigateByUrl('/menu/home'); 
      this.resetform();
     
    }).catch(err=> console.error(err.message));
    var User= this.afAuth.auth.currentUser;
 
    if(User!=null){
      User.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
   }
 
   resetform(){
     this.usuarioForm.reset();
   }
   
       
   
 
     
   }
