import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import {  } from '../services/auth-guard.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user = null;

  constructor(private router: Router, public auth: AuthService) {

  }

  // signInWithGoogle() {
  //   this.authService.googleLogin()
  //   .then(() => {
  //       this.router.navigate(['/menu'])
  //     })
  //   .catch((err) => console.log(err));
  // }

  ngOnInit() {
  }
}
