import { Component, OnInit } from '@angular/core';

import { Comida } from '../../models/comida';
import { ComidaService } from '../../services/comida.service';

import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { of } from 'rxjs';

import { CarritoService } from '../../services/carrito.service';

import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  comidas: Comida[];

  
  user: User;

  carrito: Comida[]; 

  userKey:string;

  costo: number = 0;

  impuestos: number = 0;
  total: number = 0;

  
  constructor(public carritoService : CarritoService, public comidaService: ComidaService, public auth: AuthService){}

  ngOnInit() {
    

    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
    })

    this.auth.user.subscribe(user=>{
      this.userKey = user.uid;
      this.carritoService.getCarrito(user.uid).subscribe(carrito =>{
        this.carrito= [];
        carrito.forEach(comida=>{
        
          let carritoComida = comida.payload.doc.data() as Comida;
          carritoComida["carritoComidaId"] = comida.payload.doc.id;
          this.carrito.push(carritoComida);
          this.costo = this.costo + carritoComida.precio;
          this.getTotal();

        })
      })
    })

  }

  getTotal(){
    this.impuestos = this.costo*0.12;

    this.total = this.costo + this.impuestos;
  }

  

}
