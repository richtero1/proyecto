import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isCollapsed = true;

  user : User; 
   
  constructor(public auth: AuthService) { 
    
    this.auth.user.subscribe(user=>{
      this.user=user;
      
    })
  }

  ngOnInit() {

  }
}
