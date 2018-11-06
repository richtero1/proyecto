import { Injectable } from '@angular/core';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

import { Comida } from '../models/comida' ;

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  comidasCollection: AngularFirestoreCollection<Comida>;
  comidas: Observable<Comida[]>;
  comidaDoc: AngularFirestoreDocument<Comida>;

  constructor(public afs:AngularFirestore) {
    this.comidasCollection = this.afs.collection<Comida>('comidas');
    
    this.comidas = this.comidasCollection.snapshotChanges().pipe(
      map(actions => { 
        return actions.map(a => {
        const data = a.payload.doc.data() as Comida;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getComidas() {
    
    return this.comidas = this.comidasCollection.snapshotChanges().pipe(
      map(actions => { 
        return actions.map(a => {
        const data = a.payload.doc.data() as Comida;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    
  }
  
  addComida(comida: Comida) {
    this.comidaDoc = this.afs.doc(`comidas/${comida.id}`);
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
    this.comidaDoc = this.afs.doc(`comidas/${comida.disponibilidad}`);
    comida.disponibilidad=false;
    
    this.comidaDoc.update(comida);
    
  }

  enableComida(comida: Comida){
    this.comidaDoc = this.afs.doc(`comidas/${comida.disponibilidad}`);
    comida.disponibilidad=true;
    
    this.comidaDoc.update(comida);
    
  }

  

}
