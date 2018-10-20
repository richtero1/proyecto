import { Component, OnInit } from '@angular/core';

import { Comida } from '../../models/comida';
import { ComidaService } from '../../services/comida.service';

import { Carrito } from '../../models/carrito';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  comidas: Comida[];

  carritos: Carrito[];
  editState: boolean = false;
  carritoToEdit: Comida;

  carrito: Carrito = {
    nombre: '',
    precio: null,
    photoUrl:'',
    cantidad:null
  };

  constructor(public carritoService : CarritoService, public comidaService: ComidaService) { }

  ngOnInit() {
    this.carritoService.getTasks().subscribe(carritos => {
      this.carritos = carritos;
    })

    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
    });
  }

  onSubmit(){
    if(this.carrito.nombre != '' && this.carrito.precio != null && this.carrito.photoUrl != ''){
        this.carritoService.addTask(this.carrito);
        this.carrito.nombre = '';
        this.carrito.precio = null;
        this.carrito.photoUrl = '';
    }
  }

  deleteTask(event, carrito) {
    const response = confirm('Estas seguro que quieres eliminar este producto?');
    if (response ) {
      this.carritoService.deleteTask(carrito);
    }
    return;
  }

  editTask(event, carrito) {
    this.editState = !this.editState;
    this.carritoToEdit = carrito;
  }

  updateTask(carrito) {
    this.carritoService.updateTask(carrito);
    this.carritoToEdit = null;
    this.editState = false;
  }

}
