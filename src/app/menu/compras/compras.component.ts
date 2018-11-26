import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden';

import { Comida } from '../../models/comida';
import { ComidaService } from '../../services/comida.service';

import { CarritoService } from '../../services/carrito.service';

import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Compras } from 'src/app/models/compras';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent implements OnInit {

  compra: Orden[];

  userKey:string;

  costo: number = 0;

  impuestos: number = 0;
  total: number = 0;

  compras: Compras[];

  constructor(public carritoService : CarritoService, public comidaService: ComidaService, public auth: AuthService) { 
    
    
  }

  ngOnInit() {

    this.auth.user.subscribe(user=>{
      this.userKey = user.uid;
      this.carritoService.getCompra(user.uid).subscribe(comp =>{
        this.compra= [];
        comp.forEach(comida=>{
          let compraComida = comida.payload.doc.data();
          compraComida["carritoComidaId"] = comida.payload.doc.id;
          this.compra.push(compraComida);
          this.costo = this.costo + compraComida.precio;
          this.getTotal();
          
        })
        
        
        console.log(this.compra);
      })
    })
  }

  getTotal(){
    this.impuestos = this.costo*0.12;

    this.total = this.costo + this.impuestos;
  }


}
