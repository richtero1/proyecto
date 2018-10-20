import { Component, OnInit } from '@angular/core';

import { Comida } from '../../../models/comida'
import { ComidaService } from '../../../services/comida.service'

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
