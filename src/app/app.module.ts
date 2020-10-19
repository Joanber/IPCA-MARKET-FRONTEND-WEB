import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ProductoComponent } from "./components/producto/producto-add/producto.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PrincipalComponent } from "./components/principal.component";
import { PersonasListComponent } from "./components/Personas/personas-list/personas-list.component";
import { PersonasAddComponent } from "./components/Personas/personas-add/personas-add.component";
import { ProductoListComponent } from "./components/producto/producto-list/producto-list.component";
import { Grafico1Component } from "./elements/grafico1/grafico1.component";
import { UsuarioListComponent } from "./components/usuario/usuario-list/usuario-list.component";
import { UsuarioAddComponent } from "./components/usuario/usuario-add/usuario-add.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/* LIbs necesarias */
import { MatDatepickerModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ArraypipePipe } from "./pipes/arraypipe.pipe";
import { ProductoInComponent } from "./components/inventario/producto-in/producto-in.component";
import { InventarioComponent } from "./components/inventario/inventario/inventario.component";
import { DashboardPersonasComponent } from "./components/Personas/dashboard-personas/dashboard-personas.component";
import { PaginadorComponent } from "./components/paginador/paginador.component";
import { DashbordProductosComponent } from "./components/producto/dashbord-productos/dashbord-productos.component";
import { CategoriaListComponent } from "./components/categoria/categoria-list/categoria-list.component";
import { CategoriaAddComponent } from "./components/categoria/categoria-add/categoria-add.component";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ValidatorPasswordDirective } from "./components/validators/validator-password.directive";
import { ReportesComponent } from "./components/inventario/reportes/reportes.component";
import { ModalFacturaComponent } from "./components/modal-factura/modal-factura.component";
import { FacturasVentasComponent } from "./components/facturas-ventas/facturas-ventas.component";
import { ProdBajoInvComponent } from "./components/inventario/prod-bajo-inv/prod-bajo-inv.component";
import { RepInventarioComponent } from './components/inventario/rep-inventario/rep-inventario.component'; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

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
    UsuarioAddComponent,
    ArraypipePipe,
    ProductoInComponent,
    DashboardPersonasComponent,
    PaginadorComponent,
    DashbordProductosComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
    ValidatorPasswordDirective,
    ReportesComponent,
    ModalFacturaComponent,
    FacturasVentasComponent,
    ProdBajoInvComponent,
    RepInventarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-US" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
