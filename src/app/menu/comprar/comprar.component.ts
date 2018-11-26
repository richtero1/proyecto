import { Component, OnInit } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

import { Comida } from '../../models/comida'
import { ComidaService } from '../../services/comida.service'

import { CarritoService } from '../../services/carrito.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';

import * as $ from 'jquery';


@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  
  comidas: Comida[];

  comida: Comida;

  comidaselected: Comida;

  searchterm: string;
 
  startAt = new Subject();
  endAt = new Subject();

  extraForm: FormGroup;

  user : User;  
 
  clubs;
  allcomidas;
 
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  extra = document.createElement("extra");
  extras: boolean[] = [];

  constructor(public comidaService : ComidaService, public carritoService : CarritoService, public afs : AngularFirestore, public auth: AuthService, public fb: FormBuilder) {

    this.auth.user.subscribe(user=>{
      this.user=user;
      
    })

    this.extraForm= this.fb.group({
      
    })

    
  }

  ngOnInit() {
    
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
      
    });

    this.getallcomidas().subscribe((comidas) => {
      this.allcomidas = comidas;
    })
    
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((comidas) => {
        this.comidas = comidas;
      })
    })


  }

  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.comidas = this.allcomidas;
    }
  }
 
  firequery(start, end) {
    return this.afs.collection('comidas', ref => ref.limit(4).orderBy('nombre').startAt(start).endAt(end)).valueChanges();
  }
 
  getallcomidas() {
    return this.afs.collection('comidas', ref => ref.orderBy('nombre')).valueChanges();
  }

  selectedComida(comida){
    this.comidaselected=comida;
    
  }

  addCarrito(comida :Comida){
    this.carritoService.addComida(this.user.uid,comida);

    

  }

  addToForm(){
    this.comidas.forEach(comida => {
      comida.extras.forEach((extra,index)=>{
        this.extraForm.addControl(extra,new FormControl(false,[Validators.required]));
      })
    })
    
  }


  modifyPrecio(precio : number){
    
  }

}


