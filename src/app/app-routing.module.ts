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
import { ConecctionGuard } from "./services/guards/conecction.guard";
import { NoconnectionComponent } from "./components/noconnection/noconnection.component";
import { ModalFacturaComponent } from "./components/modal-factura/modal-factura.component";
import { CobrarGuard } from "./services/guards/cobrar.guard";
import { FacturasListComponent } from "./components/inventario/facturas-list/facturas-list.component";
import { FacturasEditComponent } from "./components/inventario/facturas-edit/facturas-edit.component";

const routes: Routes = [
  { path: "login", component: LoginComponen },
  {
    path: "",
    component: PrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "not-conection", component: NoconnectionComponent },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard, ConecctionGuard],
      },
      {
        path: "cobrar",
        component: ModalFacturaComponent,
        canActivate: [AuthGuard, ConecctionGuard, CobrarGuard],
      },
      {
        path: "dashprod",
        component: DashbordProductosComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "producto",
            component: ProductoListComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "producto/form",
            component: ProductoComponent,
            canActivate: [AuthGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "producto/form/:id",
            component: ProductoComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN"],
            },
          },
          {
            path: "categoria",
            component: CategoriaListComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "categoria/form",
            component: CategoriaAddComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "categoria/form/:id",
            component: CategoriaAddComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
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
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "usuarios",
            component: UsuarioListComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "usuarios/form",
            component: UsuarioAddComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN"],
            },
          },
          {
            path: "usuarios/form/:id",
            component: UsuarioAddComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN"],
            },
          },
          {
            path: "usuarios/changepass/:id",
            component: CambiarPassComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN"],
            },
          },
          {
            path: "personas/form",
            component: PersonasAddComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "personas/form/:id",
            component: PersonasAddComponent,
            canActivate: [AuthGuard, RoleGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
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
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "reporte",
            component: ReportesComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "productos/bajos",
            component: ProdBajoInvComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "reporte_inventario",
            component: RepInventarioComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN", "ROLE_USER"],
            },
          },
          {
            path: "facturas",
            component: FacturasListComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN"],
            },
          },
          {
            path: "factura/:id",
            component: FacturasEditComponent,
            canActivate: [AuthGuard, RoleGuard, ConecctionGuard],
            data: {
              role: ["ROLE_ADMIN"],
            },
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
