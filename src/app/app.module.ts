import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }          from '@angular/forms';



import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { PagoComponent } from './pago/pago.component';
import { BuscarComponent } from './menu/buscar/buscar.component';
import { CarritoComponent } from './menu/carrito/carrito.component';
import { ComprarComponent } from './menu/comprar/comprar.component';
import { CambioComponent } from './menu/cambio/cambio.component';
import { AdminComponent } from './menu/admin/admin.component';
import { EliminarComponent } from './menu/admin/eliminar/eliminar.component';
import { HeaderComponent } from './header/header.component';
import { OrdenComponent } from './menu/orden/orden.component';
import { ComprasComponent } from './menu/compras/compras.component';
import { ModificarComponent } from './menu/admin/modificar/modificar.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'menu', component: MenuComponent,
    children: [
      {path: 'comprar', component: ComprarComponent},
      {path: 'buscar', component: BuscarComponent},
      {path: 'carrito', component: CarritoComponent},
      {path: 'cambio', component: CambioComponent},
      {path: 'orden', component: OrdenComponent},
      {path: 'compras', component: ComprasComponent},
      {path: 'admin', component:AdminComponent},
    ]
  },
  { path: 'buscar', component: BuscarComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    PagoComponent,
    BuscarComponent,
    CarritoComponent,
    ComprarComponent,
    CambioComponent,
    AdminComponent,
    EliminarComponent,
    HeaderComponent,
    OrdenComponent,
    ComprasComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
