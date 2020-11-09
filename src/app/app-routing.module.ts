import { ReportesComponent } from "./components/inventario/reportes/reportes.component";
import { DashbordProductosComponent } from "./components/producto/dashbord-productos/dashbord-productos.component";
import { CategoriaListComponent } from "./components/categoria/categoria-list/categoria-list.component";
import { CategoriaAddComponent } from "./components/categoria/categoria-add/categoria-add.component";
import { FacturasVentasComponent } from "./components/facturas-ventas/facturas-ventas.component";
import { ProdBajoInvComponent } from "./components/inventario/prod-bajo-inv/prod-bajo-inv.component";
import { RepInventarioComponent } from "./components/inventario/rep-inventario/rep-inventario.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { PrincipalComponent } from "./components/principal.component";
import { ProductoListComponent } from "./components/producto/producto-list/producto-list.component";
import { PersonasListComponent } from "./components/Personas/personas-list/personas-list.component";
import { InventarioComponent } from "./components/inventario/inventario/inventario.component";
import { ProductoComponent } from "./components/producto/producto-add/producto.component";
import { PersonasAddComponent } from "./components/Personas/personas-add/personas-add.component";
import { UsuarioListComponent } from "./components/usuario/usuario-list/usuario-list.component";
import { UsuarioAddComponent } from "./components/usuario/usuario-add/usuario-add.component";
import { DashboardPersonasComponent } from "./components/Personas/dashboard-personas/dashboard-personas.component";
import { ProductoInComponent } from "./components/inventario/producto-in/producto-in.component";
import { AuthGuard } from "./services/guards/auth.guard";
import { RoleGuard } from "./services/guards/role.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: PrincipalComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      { path: "home/ventas", component: FacturasVentasComponent },
      {
        path: "dashprod",
        component: DashbordProductosComponent,
        children: [
          { path: "producto", component: ProductoListComponent },
          { path: "producto/form", component: ProductoComponent },
          { path: "producto/form/:id", component: ProductoComponent },
          { path: "categoria", component: CategoriaListComponent },
          { path: "categoria/form", component: CategoriaAddComponent },
          { path: "categoria/form/:id", component: CategoriaAddComponent },
          { path: "**", pathMatch: "full", redirectTo: "producto" },
        ],
      },
      {
        path: "dashper",
        component: DashboardPersonasComponent,
        children: [
          {
            path: "personas",
            component: PersonasListComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: { role: "ROLE_ADMIN" },
          },
          { path: "personas/page/:page", component: PersonasListComponent },
          { path: "usuarios", component: UsuarioListComponent },
          { path: "usuarios/form", component: UsuarioAddComponent },
          { path: "usuarios/form/:id", component: UsuarioAddComponent },
          { path: "personas/form", component: PersonasAddComponent },
          { path: "personas/form/:id", component: PersonasAddComponent },
          { path: "**", pathMatch: "full", redirectTo: "personas" },
        ],
      },
      {
        path: "inventario",
        component: InventarioComponent,
        children: [
          { path: "producto", component: ProductoInComponent },
          { path: "reporte", component: ReportesComponent },
          { path: "productos/bajos", component: ProdBajoInvComponent },
          { path: "reporte_inventario", component: RepInventarioComponent },
          { path: "**", pathMatch: "full", redirectTo: "producto" },
        ],
      },
      { path: "**", pathMatch: "full", redirectTo: "home" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
