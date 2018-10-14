import { Component, OnInit } from '@angular/core';

import { Comida } from '../../comida'
import { ComidaService } from '../../comida.service'



@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  verdadero: string= "si";
  falso: string = "no";

  comidas: Comida[];

  constructor(public comidaService : ComidaService) { }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
      console.log(comidas);
    })
  }



}
