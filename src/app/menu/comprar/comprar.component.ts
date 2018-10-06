import { Component, OnInit } from '@angular/core';

class Comida {
  nombre: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

  arreglo: Array<Comida> =
  [
    {
      "nombre":"Hamburguesa",
      "precio": 5,
      "imagen": "hamburguesa",
      
    },
    {
      "nombre":"Pizza",
      "precio": 10,
      "imagen": "pizza",
      
    },
    {
      "nombre":"Papas",
      "precio": 2,
      "imagen": "papas",
      
    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "imagen": "tequenos",
      
    },
    {
      "nombre":"lole",
      "precio": 4,
      "imagen": "tequenos",
      
    }
  ]

  constructor() { }

  ngOnInit() {
    this.arreglo.forEach((comida: Comida)=>{
      console.log("Comida",comida) 
    })
  }

}
