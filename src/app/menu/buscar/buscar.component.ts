import { Component, OnInit } from '@angular/core';

class Comida {
  nombre: string;
  precio: number;
  imagen: string;
  disponibilidad: boolean;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  verdadero: string= "si";
  falso: string = "no";


  
  arreglo: Array<Comida> =
  [
    {
      "nombre":"Hamburguesa",
      "precio": 5,
      "imagen": "hamburguesa",
      "disponibilidad": false,
    },
    {
      "nombre":"Pizza",
      "precio": 10,
      "imagen": "pizza",
      "disponibilidad": true,
    },
    {
      "nombre":"Papas",
      "precio": 2,
      "imagen": "papas",
      "disponibilidad": true,
    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "imagen": "tequenos",
      "disponibilidad": true,
    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "imagen": "tequenos",
      "disponibilidad": true,
    }
  ]

  constructor() { }

  ngOnInit() {
  
  	
  }



}
