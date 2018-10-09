import { Component, OnInit } from '@angular/core';

class Comida {
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  
  arreglo: Array<Comida> =
  [
    {
      "nombre":"Hamburguesa",
      "precio": 5,
      "imagen": "hamburguesa",
      "cantidad":1,
    },
    {
      "nombre":"Pizza",
      "precio": 10,
      "imagen": "pizza",
      "cantidad":2,
    },
    {
      "nombre":"Papas",
      "precio": 2,
      "imagen": "papas",
      "cantidad":2,
    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "imagen": "tequenos",
      "cantidad":1,
    },
    {
      "nombre":"Hamburguesa",
      "precio": 4,
      "imagen": "hamburguesa",
      "cantidad":1,
    }
  ]

  constructor() { }

  ngOnInit() {
  
  }

}
