import { Component, OnInit } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

import { Comida } from '../../models/comida'
import { ComidaService } from '../../services/comida.service'

import { Carrito } from '../../models/carrito';
import { CarritoService } from '../../services/carrito.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  
  comidas: Comida[];

  carritos: Carrito[];

  carrito: Carrito = {
    nombre: '',
    precio: null,
    photoUrl:'',
    cantidad:null
  };

  comida: Comida;

  comidaselected: Comida;

  searchterm: string;
 
  startAt = new Subject();
  endAt = new Subject();
 
  clubs;
  allcomidas;
 
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(public comidaService : ComidaService, public carritoService : CarritoService, public afs : AngularFirestore) {  }

  ngOnInit() {
    
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
      console.log(comidas);
    });

    this.getallcomidas().subscribe((comidas) => {
      this.allcomidas = comidas;
    })

    this.carritoService.getTasks().subscribe(carritos => {
      this.carritos = carritos;
    });

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

  onSubmit(){
    if(this.carrito.nombre != '' && this.carrito.precio != null && this.carrito.photoUrl != '' ){
        // this.carritoService.carritoCollection.add();

        this.comidaselected=this.comida;

        this.carrito=this.comidaselected;
        this.carritos.push(this.carrito);
        this.carritoService.addTask(this.carrito);

        this.comidaselected.nombre = '';
        this.comidaselected.precio = null;
        this.comidaselected.photoUrl = '';

        this.carrito.nombre = '';
        this.carrito.precio = null;
        this.carrito.photoUrl = '';
    }
    console.log(this.carritos);
  }

  

}
