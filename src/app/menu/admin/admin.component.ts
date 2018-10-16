import { Component, OnInit } from '@angular/core';

import { Comida } from '../../comida'
import { ComidaService } from '../../comida.service'



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  comidas: Comida[];
  editState: boolean = false;
  comidaToEdit: Comida;

  comida: Comida = {
    nombre: '',
    precio: null,
    photoUrl:''
  };

  constructor(public comidaService : ComidaService) { }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
      console.log(comidas);
    })
  }

  onSubmit(){
    if(this.comida.nombre != '' && this.comida.precio != null && this.comida.photoUrl != ''){
        this.comidaService.addComida(this.comida);
        this.comida.nombre = '';
        this.comida.precio = null;
        this.comida.photoUrl = '';
    }
  }

  deleteComida(event, comida) {
    const response = confirm('Estas seguro que quieres eliminar este producto?');
    if (response ) {
      this.comidaService.disableComida(comida);
    }
    return;
  }

  editComida(event, comida) {
    this.editState = !this.editState;
    this.comidaToEdit = comida;
  }

  updateComida(comida) {
    this.comidaService.updateComida(comida);
    this.comidaToEdit = null;
    this.editState = false;
  }

  
}
