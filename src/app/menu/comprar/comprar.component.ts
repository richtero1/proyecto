import { Component, OnInit } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

import { Comida } from '../../comida'
import { ComidaService } from '../../comida.service'

import { Carrito } from '../../carrito';
import { CarritoService } from '../../carrito.service';


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



  constructor(public comidaService : ComidaService, public carritoService : CarritoService) {  }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
    });

    this.carritoService.getTasks().subscribe(carritos => {
      this.carritos = carritos;
    });

  }

  onSubmit(){
    if(this.carrito.nombre != '' && this.carrito.precio != null && this.carrito.photoUrl != '' ){
        // this.carritoService.carritoCollection.add();
        this.carritoService.addTask(this.carrito);
        this.carrito.nombre = '';
        this.carrito.precio = null;
        this.carrito.photoUrl = '';
    }
  }



}
