import { Component, OnInit } from '@angular/core';

import { Comida } from '../../models/comida'
import { ComidaService } from '../../services/comida.service'

import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

import { CarritoService } from '../../services/carrito.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  searchterm: string;
 
  startAt = new Subject();
  endAt = new Subject();
 
  clubs;
  allcomidas;
 
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();


  verdadero: string= "si";
  falso: string = "no";

  comidas: Comida[];

  user: User;

  constructor(public comidaService : ComidaService, private afs: AngularFirestore, public carritoService: CarritoService, public auth: AuthService) { }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
      console.log(comidas);
    })

    this.getallcomidas().subscribe((comidas) => {
      this.allcomidas = comidas;
    })

    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((comidas) => {
        this.comidas = comidas;
      })
    })

    this.auth.user.subscribe(user=>{
      this.user=user;
      console.log(user);
    })
  }

  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.comidas = this.allcomidas;
    }
  }
 
  firequery(start, end) {
    return this.afs.collection('comidas', ref => ref.limit(4).orderBy('nombre').startAt(start).endAt(end)).valueChanges();
  }
 
  getallcomidas() {
    return this.afs.collection('comidas', ref => ref.orderBy('nombre')).valueChanges();
  }

  addCarrito(comida :Comida){
    this.carritoService.addComida(this.user.uid,comida);


  }


}
