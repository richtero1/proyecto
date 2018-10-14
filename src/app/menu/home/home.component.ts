import { Component, OnInit } from '@angular/core';

import { Comida } from '../../comida'
import { ComidaService } from '../../comida.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comidas: Comida[];

  constructor(public comidaService : ComidaService) { }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
    })
  }

}
