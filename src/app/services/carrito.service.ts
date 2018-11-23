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


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carritoCollection: AngularFirestoreCollection<Comida>;
  carrito: Observable<Comida[]>;
  carritoDoc: AngularFirestoreDocument<Comida>;

  constructor(public afs:AngularFirestore, public auth: AuthService ) {
    
  }

  getCarrito(id: string) {

    return this.afs.collection('carritos').doc(id).collection('carrito').snapshotChanges();
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
   
  //  carritoDoc.doc(uid).delete().then(result=>{
  //    console.log("Result",result)
  //  }).catch(err=>{
  //    console.log("Error",err)
  //  });
 }

  
}
