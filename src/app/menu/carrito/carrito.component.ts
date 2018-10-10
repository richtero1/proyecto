import { Component, OnInit } from '@angular/core';

class Comida {
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  photoUrl: string;
  ingredientes: string[];
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
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/hamburguesa.png?alt=media&token=b6219af5-2794-4dae-ae76-56ba5d600d1f",
      "ingredientes": ["Papitas","Bebida"],
    },
    {
      "nombre":"Pizza",
      "precio": 10,
      "imagen": "pizza",
      "cantidad":2,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/hamburguesa.png?alt=media&token=b6219af5-2794-4dae-ae76-56ba5d600d1f",
      "ingredientes": ["Queso","Peperoni","Jamon"],
    },
    {
      "nombre":"Papas",
      "precio": 2,
      "imagen": "papas",
      "cantidad":2,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/hamburguesa.png?alt=media&token=b6219af5-2794-4dae-ae76-56ba5d600d1f",
      "ingredientes": ["Pequenas","Medianas","Grandes"],
    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "imagen": "tequenos",
      "cantidad":1,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/hamburguesa.png?alt=media&token=b6219af5-2794-4dae-ae76-56ba5d600d1f",
      "ingredientes": ["Salsa de Tomate","Rellenos de Chocolate"],
    }
  ]

  constructor() { }

  ngOnInit() {
  
  }

}
