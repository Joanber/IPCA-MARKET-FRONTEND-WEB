import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";
import { AppComponent } from "./app.component";
import { ProductoComponent } from "./components/producto/producto-add/producto.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PrincipalComponent } from "./components/principal.component";
import { PersonasListComponent } from "./components/Personas/personas-list/personas-list.component";
import { PersonasAddComponent } from "./components/Personas/personas-add/personas-add.component";
import { ProductoListComponent } from "./components/producto/producto-list/producto-list.component";
import { UsuarioListComponent } from "./components/usuario/usuario-list/usuario-list.component";
import { UsuarioAddComponent } from "./components/usuario/usuario-add/usuario-add.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/* LIbs necesarias */
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
import { FooterComponent } from "./components/footer/footer.component";
import { RepInventarioComponent } from "./components/inventario/rep-inventario/rep-inventario.component";
import { MatPaginatorModule } from "@angular/material/paginator";

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
import { MatDatepickerModule } from "@angular/material";
import {
  MatMomentDateModule,
  MomentDateModule,
} from "@angular/material-moment-adapter";
import { ArraypipePipe } from "./pipes/arraypipe.pipe";
import { ProductoInComponent } from "./components/inventario/producto-in/producto-in.component";
import { InventarioComponent } from "./components/inventario/inventario/inventario.component";
import { DashboardPersonasComponent } from "./components/Personas/dashboard-personas/dashboard-personas.component";
import { TokenInterceptor } from "./services/Interceptores/token.interceptor";
import { AuthInterceptor } from "./services/Interceptores/AuthInterceptor";
import { LoginComponen } from "./components/login/login.component";
import { CambiarPassComponent } from "./components/usuario/cambiar-pass/cambiar-pass.component";
import { NoconnectionComponent } from "./components/noconnection/noconnection.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponen,
    ProductoComponent,
    HomeComponent,
    NavbarComponent,
    PrincipalComponent,
    InventarioComponent,
    PersonasListComponent,
    PersonasAddComponent,
    ProductoListComponent,
    UsuarioListComponent,
    UsuarioAddComponent,
    ArraypipePipe,
    ProductoInComponent,
    DashboardPersonasComponent,
    DashbordProductosComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
    ValidatorPasswordDirective,
    ReportesComponent,
    ModalFacturaComponent,
    FacturasVentasComponent,
    ProdBajoInvComponent,
    FooterComponent,
    RepInventarioComponent,
    CambiarPassComponent,
    NoconnectionComponent,
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
    MatPaginatorModule,
    MomentDateModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-US" },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
