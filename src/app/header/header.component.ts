import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   public usuario:any;

   public user: User;
   
  constructor(public auth: AuthService) { 
    this.auth.afAuth.authState.subscribe(auth=>{
      if(auth){
        this.usuario=auth;
      
      }
    })

    this.auth.user.subscribe(user=>{
      this.user=user;
      console.log(user);
    })
  
  }

  ngOnInit() {
    
  }

  
}
