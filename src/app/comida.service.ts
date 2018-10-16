import { Injectable } from '@angular/core';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

import { Comida } from './comida' ;

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  comidasCollection: AngularFirestoreCollection<Comida>;
  comidas: Observable<Comida[]>;
  comidaDoc: AngularFirestoreDocument<Comida>;

  constructor(public afs:AngularFirestore) {
    this.comidasCollection = this.afs.collection('comidas');
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.comidas = this.comidasCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Comida;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getComidas() {
    return this.comidas; 
  }
  
  addComida(comida: Comida) {
    this.comidasCollection.add(comida);
  }

  deleteComida(comida: Comida) {
    this.comidaDoc = this.afs.doc(`comidas/${comida.id}`);
    this.comidaDoc.delete();
  }

  updateComida(comida: Comida) {
    this.comidaDoc = this.afs.doc(`comidas/${comida.id}`);
    this.comidaDoc.update(comida);
  }

  disableComida(comida: Comida){
    this.comidaDoc = this.afs.doc(`comidas/${comida.id}`);
    if(comida.disponibilidad){
      
    }
  }

}
