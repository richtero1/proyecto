import { Component, OnInit } from '@angular/core';

class Comida {
  nombre: string;
  precio: number;
  imagen: string;
  photoUrl: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  arreglo: Array<Comida> =
  [
    {
      "nombre":"Hamburguesa",
      "precio": 5,
      "imagen": "hamburguesa",
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/hamburguesa.png?alt=media&token=b6219af5-2794-4dae-ae76-56ba5d600d1f",

    },
    {
      "nombre":"Pizza",
      "precio": 10,
      "imagen": "pizza",
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/pizza.png?alt=media&token=c45edf24-bbc3-4399-b410-c10bedcd865f",

      
    },
    {
      "nombre":"Papas",
      "precio": 2,
      "imagen": "papas",
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/papas.png?alt=media&token=d98bc526-c09d-445b-8345-a87725f9d896",

    },
    {
      "nombre":"Tequeños",
      "precio": 4,
      "imagen": "tequenos",
      "photoUrl": "https://firebasestorage.googleapis.com/v0/b/umakeit-44464.appspot.com/o/tequenos.png?alt=media&token=06bd0c5b-bc92-4cfd-9305-0c455200e7df",

    }
  ]
  constructor() { }

  ngOnInit() {
    this.arreglo.forEach((comida: Comida)=>{
      console.log("Comida",comida) 
    })
  }

}
