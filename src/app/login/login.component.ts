import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router, public auth: AuthService, public fb: FormBuilder) { }

  ngOnInit() {
  }

}
