import { Injectable } from '@angular/core';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

 import { Comida } from '../models/comida';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth.service';
import { Carrito } from '../models/carrito';
import { forEach } from '@angular/router/src/utils/collection';
import { Orden } from '../models/orden';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carritoCollection: AngularFirestoreCollection<Comida>;
  carrito: Observable<Comida[]>;
  carritoDoc: AngularFirestoreDocument<Comida>;

  compraCollection: AngularFirestoreCollection<Comida>;
  compra: Observable<Comida[]>;
  compraDoc: AngularFirestoreDocument<Comida>;

  constructor(public afs:AngularFirestore, public auth: AuthService ) {
    
  }

  getCarrito(id: string) {

    return this.afs.collection('carritos').doc(id).collection('carrito').snapshotChanges();
  }

  getCompra(id: string) {
    return this.afs.collection<Orden>('compras').doc(id).collection('compras').snapshotChanges();
  }

  
  addComida(id: string, comida: Comida) {
     this.carritoDoc = this.afs.doc<Comida>(`carritos/${id}`);
    
    this.carritoDoc.collection('carrito').add(comida).then(data=>{
      console.log("Result", data)
    });

  }

  deleteComida(comida: Comida, id:string, uid:string) {
    this.carritoDoc = this.afs.doc<Comida>(`carritos/${uid}`);

   this.carritoDoc.collection('carrito').doc(id).delete().then(data=>{
    console.log("Result", data)
  });

 }

 vaciarCarrito(uid:string){
  console.log("user/id",uid)

  let carritoDoc = this.afs.collection(`carritos`);

   let removeCarrito = carritoDoc.doc(uid).collection('carrito').snapshotChanges().subscribe(data=>{
     data.forEach(element=>{
      carritoDoc.doc(uid).collection('carrito').doc(element.payload.doc.id).delete().then(data=>{
        console.log("data",data)
      })
     })
   });

 }

 addtoCompra(id: string, comida: Comida) {
  this.compraDoc = this.afs.doc<Comida>(`compras/${id}`);
 
 this.compraDoc.collection('compra').add(comida).then(data=>{
   console.log("Result", data)
 });

}

 AgregaraHistorial(uid: string, carrito: Comida[]){

  carrito.forEach(comida => {
    this.addtoCompra(uid, comida);
  });

}
  
}
