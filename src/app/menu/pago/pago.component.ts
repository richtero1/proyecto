import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { Comida } from '../../models/comida';
import { ComidaService } from '../../services/comida.service';

import { CarritoService } from '../../services/carrito.service';

import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';

import { of } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare let paypal: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit, AfterViewChecked {

  comidas: Comida[];

  user: User;

  carrito: Comida[]; 

  userKey:string;

  costo: number = 0;

  impuestos: number = 0;
  total: number = 0;

  paypalLoad: boolean = true;
  addScript: boolean = false;
  
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

  eliminarCarrito(){
    this.carrito.forEach(comida=>{
      this.carritoService.deleteComida(comida,comida.id,this.userKey);
    })
  }

  vaciarCarrito(){
    this.carritoService.vaciarCarrito(this.userKey);
  }

  paypalConfig = {
    env: 'sandbox',
    client: {
        sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
    },
    commit: true,
    payment: (data, actions) => {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: this.total , currency: 'USD' }
                    }
                ]
            }
        })
    },

    onAuthorize:(data, actions) => {
        return actions.payment.execute().then((payment) => {
            window.alert('Pago Completado!');
            //Do something when payment is successful.
            this.vaciarCarrito();
        })
    }
  };
  
  ngAfterViewChecked(): void {
    if(!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = true;
      })
    }
  }
   addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js'
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

}
