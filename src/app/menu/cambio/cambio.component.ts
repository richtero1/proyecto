import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import {  Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.css']
})

export class CambioComponent implements OnInit {

  usuarios=[];
  usuarioForm:FormGroup;
  usuario:any;

  constructor(public authservice:AuthService, public router:Router, private fb: FormBuilder, private afAuth: AngularFireAuth) { 
    this.usuarioForm=fb.group({
      password:["",Validators.required],
      password2:["",Validators.required],
      password3:["",Validators.required],
      
     
    })
    

    this.authservice.afAuth.authState.subscribe(auth =>{
      if(auth){
        this.usuario = auth;
      }
// router.navigate(["login"])
});
  }
  

  ngOnInit() {
    
     
  }

  CambiarContrasena(){
    this.afAuth.auth.currentUser.updatePassword(this.usuarioForm.value.password2);
    
  }

  resetform(){
    this.usuarioForm.reset();

  }


}
