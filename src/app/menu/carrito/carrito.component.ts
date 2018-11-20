import { Component, OnInit } from '@angular/core';

import { Comida } from '../../models/comida';
import { ComidaService } from '../../services/comida.service';

import { CarritoService } from '../../services/carrito.service';

import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  comidas: Comida[];

  user: User;

  carrito: Comida[];  

  userKey:string;

  constructor(public carritoService : CarritoService, public comidaService: ComidaService, public auth: AuthService) {

  }

   ngOnInit() {

    this.auth.user.subscribe(user=>{
      this.userKey = user.uid;
      this.carritoService.getCarrito(user.uid).subscribe(carrito =>{
        this.carrito= [];
        carrito.forEach(comida=>{
          let carritoComida = comida.payload.doc.data();
          carritoComida["carritoComidaId"] = comida.payload.doc.id;
          this.carrito.push(carritoComida);
        })
      })
    })
 
  }

  

   deleteComida(comida: Comida, id: string){
      this.carritoService.deleteComida(comida,id,this.userKey);
      console.log(id);
   }


   addCarrito(comida :Comida){
    this.carritoService.addComida(this.userKey,comida);


  }
}
