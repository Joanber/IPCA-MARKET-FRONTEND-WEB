import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PrincipalComponent } from './components/principal.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { PersonasListComponent } from './components/Personas/personas-list/personas-list.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProductoComponent } from './components/producto/producto-add/producto.component';
import { PersonasAddComponent } from './components/Personas/personas-add/personas-add.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioAddComponent } from './components/usuario/usuario-add/usuario-add.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '',
    component: PrincipalComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuario-list', component: UsuarioListComponent },
      { path: 'usuario-add', component: UsuarioAddComponent },
      { path: 'producto-list', component: ProductoListComponent },
      { path: 'producto-add', component: ProductoComponent },
      { path: 'persona-list', component: PersonasListComponent },
      { path: 'persona-add', component: PersonasAddComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
