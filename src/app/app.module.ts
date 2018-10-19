import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }          from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ComidaService } from './comida.service';

import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { PagoComponent } from './menu/pago/pago.component';
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
import { HomeComponent } from './menu/home/home.component';
import { environment } from '../environments/environment.prod';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  
  { path: 'menu', component: MenuComponent,
    children: [
      {path: 'comprar', component: ComprarComponent},
      {path: 'buscar', component: BuscarComponent},
      {path: 'carrito', component: CarritoComponent},
      {path: 'cambio', component: CambioComponent},
      {path: 'orden', component: OrdenComponent},
      {path: 'compras', component: ComprasComponent},
      {path: 'admin', component:AdminComponent, canActivate: [AuthGuard]},
      {path: 'home', component:HomeComponent},
      { path: 'pago', component: PagoComponent },
    ]
  },
  { path: 'buscar', component: BuscarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
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
    ModificarComponent,
    HomeComponent,
    PerfilComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase, 'angular-fs'),    
    AngularFirestoreModule,
    AngularFireAuthModule,
    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    
  ],
  providers: [
    ComidaService,
    AuthService,
    AuthGuard,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
