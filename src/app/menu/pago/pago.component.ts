import { Component, OnInit } from '@angular/core';

class Comida {
  nombre: string;
  precio: number;
  photoUrl: string;
  cantidad: number;
  ingredientes: string[];
}

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  Pagar(){
    
  }

  arreglo: Array<Comida> =
  [
    {
      "nombre":"Hamburguesa",
      "precio": 5,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/hamburguesa.png?alt=media&token=b6219af5-2794-4dae-ae76-56ba5d600d1f",
      "ingredientes": ["Papitas","Bebida"],
      "cantidad": 2
    },
    {
      "nombre":"Pizza",
      "precio": 10,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/pizza.png?alt=media&token=c45edf24-bbc3-4399-b410-c10bedcd865f",
      "ingredientes": ["Queso","Peperoni","Jamon"],
      "cantidad": 1,
    },
    {
      "nombre":"Papas",
      "precio": 2,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/papas.png?alt=media&token=d98bc526-c09d-445b-8345-a87725f9d896",
      "ingredientes": ["Pequenas","Medianas","Grandes"],
      "cantidad" : 0 ,
      
    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/tequenos.png?alt=media&token=06bd0c5b-bc92-4cfd-9305-0c455200e7df",
      "ingredientes": ["Salsa de Tomate","Rellenos de Chocolate"],
      "cantidad" : 1,

    },
    
  ]

  constructor() { }

  ngOnInit() {
  }

}
