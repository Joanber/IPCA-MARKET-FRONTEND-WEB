import { ReportesComponent } from "./components/inventario/reportes/reportes.component";
import { DashbordProductosComponent } from "./components/producto/dashbord-productos/dashbord-productos.component";
import { CategoriaListComponent } from "./components/categoria/categoria-list/categoria-list.component";
import { CategoriaAddComponent } from "./components/categoria/categoria-add/categoria-add.component";
import { FacturasVentasComponent } from "./components/facturas-ventas/facturas-ventas.component";
import { ProdBajoInvComponent } from "./components/inventario/prod-bajo-inv/prod-bajo-inv.component";
import { RepInventarioComponent } from "./components/inventario/rep-inventario/rep-inventario.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
import { LoginComponen } from "./components/login/login.component";
import { CambiarPassComponent } from "./components/usuario/cambiar-pass/cambiar-pass.component";
import { RoleGuard } from "./services/guards/role.guard";

const routes: Routes = [
  { path: "login", component: LoginComponen },
  {
    path: "",
    component: PrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "home/ventas",
        component: FacturasVentasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "dashprod",
        component: DashbordProductosComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "producto",
            component: ProductoListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "producto/form",
            component: ProductoComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "producto/form/:id",
            component: ProductoComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "categoria",
            component: CategoriaListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "categoria/form",
            component: CategoriaAddComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "categoria/form/:id",
            component: CategoriaAddComponent,
            canActivate: [AuthGuard],
          },
          { path: "**", pathMatch: "full", redirectTo: "producto" },
        ],
      },
      {
        path: "dashper",
        component: DashboardPersonasComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "personas",
            component: PersonasListComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_DOCENTE", "ROLE_ESTUDIANTE"],
            },
          },
          {
            path: "usuarios",
            component: UsuarioListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "usuarios/form",
            component: UsuarioAddComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "usuarios/form/:id",
            component: UsuarioAddComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "usuarios/changepass/:id",
            component: CambiarPassComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "personas/form",
            component: PersonasAddComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "personas/form/:id",
            component: PersonasAddComponent,
            canActivate: [AuthGuard],
          },
          { path: "**", pathMatch: "full", redirectTo: "personas" },
        ],
      },
      {
        path: "inventario",
        component: InventarioComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "producto",
            component: ProductoInComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "reporte",
            component: ReportesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "productos/bajos",
            component: ProdBajoInvComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "reporte_inventario",
            component: RepInventarioComponent,
            canActivate: [AuthGuard],
          },
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
