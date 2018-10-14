import { Component, OnInit } from '@angular/core';

import { Comida } from '../../comida';
import { ComidaService } from '../../comida.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  comidas: Comida[];

  constructor(public comidaService : ComidaService) { }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas;
    })
  }

}
