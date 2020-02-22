import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './components/producto/producto-add/producto.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrincipalComponent } from './components/principal.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { PersonasListComponent } from './components/Personas/personas-list/personas-list.component';
import { PersonasAddComponent } from './components/Personas/personas-add/personas-add.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { Grafico1Component } from './elements/grafico1/grafico1.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioAddComponent } from './components/usuario/usuario-add/usuario-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductoComponent,
    HomeComponent,
    NavbarComponent,
    PrincipalComponent,
    InventarioComponent,
    PersonasListComponent,
    PersonasAddComponent,
    ProductoListComponent,
    Grafico1Component,
    UsuarioListComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
