import { Injectable } from '@angular/core';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

 import { Carrito } from '../app/carrito';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carritoCollection: AngularFirestoreCollection<Carrito>;
  carrito: Observable<Carrito[]>;
  carritoDoc: AngularFirestoreDocument<Carrito>;

  constructor(public afs:AngularFirestore) {
    this.carritoCollection = this.afs.collection('carrito');
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.carrito = this.carritoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Carrito;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getTasks() {
    return this.carrito; 
  }
  
  addTask(carrito: Carrito) {
    this.carritoCollection.add(carrito);
  }

  deleteTask(carrito: Carrito) {
    this.carritoDoc = this.afs.doc(`carrito/${carrito.id}`);
    this.carritoDoc.delete();
  }

  updateTask(carrito: Carrito) {
    this.carritoDoc = this.afs.doc(`carrito/${carrito.id}`);
    this.carritoDoc.update(carrito);
  }
}
