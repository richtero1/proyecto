import { Injectable } from '@angular/core';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

import { Comida } from './comida' ;

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
    // this.comidas = this.afs.collection('comidas').valueChanges();
    // this.comidas = this.comidasCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Comida;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // });
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
    //console.log(this.comidas);
    //return this.comidas; 
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
