import { Component, OnInit } from '@angular/core';

import { Comida } from '../../models/comida';
import { ComidaService } from '../../services/comida.service';

import { CarritoService } from '../../services/carrito.service';

import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';

import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { of } from 'rxjs';

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

  public payPalConfig?: PayPalConfig;

  
  constructor(public carritoService : CarritoService, public comidaService: ComidaService, public auth: AuthService){}

  ngOnInit() {
    
    this.initConfig();

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

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
        },
        button: {
          label: 'paypal',
          layout: 'vertical'
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          console.log('OnPaymentComplete');
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError');
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: 'Angular PayPal'
        },
        transactions: [
          {
            amount: {
              total: 30.11,
              currency: 'USD',
              details: {
                subtotal: 30.00,
                tax: 0.07,
                shipping: 0.03,
                handling_fee: 1.00,
                shipping_discount: -1.00,
                insurance: 0.01
              }
            },
            custom: 'Custom value',
            item_list: {
              items: [
                {
                  name: 'hat',
                  description: 'Brown hat.',
                  quantity: 5,
                  price: 3,
                  tax: 0.01,
                  sku: '1',
                  currency: 'USD'
                },
                {
                  name: 'handbag',
                  description: 'Black handbag.',
                  quantity: 1,
                  price: 15,
                  tax: 0.02,
                  sku: 'product34',
                  currency: 'USD'
                }],
              shipping_address: {
                recipient_name: 'Brian Robinson',
                line1: '4th Floor',
                line2: 'Unit #34',
                city: 'San Jose',
                country_code: 'US',
                postal_code: '95131',
                phone: '011862212345678',
                state: 'CA'
              },
            },
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );

  
    }

}
