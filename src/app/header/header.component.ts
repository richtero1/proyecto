import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   public usuario:any;
   
  constructor(public auth: AuthService) { 
    this.auth.afAuth.authState.subscribe(auth=>{
      if(auth){
        this.usuario=auth;
      
      }
    })
  
  }

  ngOnInit() {
    
  }

  
}
