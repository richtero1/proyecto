import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import {MatButtonModule} from '@angular/material/button';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatChipsModule} from '@angular/material/chips';

import { ComidaService } from './services/comida.service';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './admin.guard';
import { CanReadGuard } from './can-read.guard';

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
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent},
  
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] ,
    children: [
      {path: 'comprar', component: ComprarComponent ,canActivate: [AuthGuard, CanReadGuard] },
      {path: 'buscar', component: BuscarComponent ,canActivate: [AuthGuard, CanReadGuard] },
      {path: 'carrito', component: CarritoComponent ,canActivate: [AuthGuard, CanReadGuard] },
      {path: 'cambio', component: CambioComponent ,canActivate: [AuthGuard, CanReadGuard] },
      {path: 'orden', component: OrdenComponent ,canActivate: [AuthGuard, CanReadGuard] },
      {path: 'compras', component: ComprasComponent ,canActivate: [AuthGuard, CanReadGuard] },
      {path: 'admin', component:AdminComponent, canActivate: [AuthGuard, AdminGuard], },
      {path: 'home', component:HomeComponent ,canActivate: [AuthGuard, CanReadGuard] },
      { path: 'pago', component: PagoComponent ,canActivate: [AuthGuard, CanReadGuard] },
    ]
  },
  { path: 'buscar', component: BuscarComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'login', component: LoginComponent},
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatInputModule,
    // MatSelectModule,
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
