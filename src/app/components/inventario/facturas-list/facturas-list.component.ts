import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { Factura } from "src/app/models/factura";
import { Usuario } from "src/app/models/usuario";
import { FacturasService } from "src/app/services/facturas.service";
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-facturas-list",
  templateUrl: "./facturas-list.component.html",
  styleUrls: ["./facturas-list.component.css"],
  providers: [DatePipe],
})
export class FacturasListComponent implements OnInit {
  public facturas: Factura[];
  public usuarios: Usuario[];
  public user: string = undefined;
  public fecha: string = null;
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public cont: number;
  public totalVentas: number;
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;

  constructor(
    private srvF: FacturasService,
    private usuarioService: UsuarioService,
    private miDatePipe: DatePipe
  ) {
    this.getUsuarios();
    this.obtenerFacturas(this.paginaActual.toString(), this.user, this.fecha);
  }

  ngOnInit() {}
  public async getUsuarios() {
    this.usuarios = await this.usuarioService
      .getUsuarios()
      .toPromise()
      .then((usuarios) => (this.usuarios = usuarios));
  }
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.obtenerFacturas(this.paginaActual.toString(), this.user, this.fecha);
  }

  private async obtenerFacturas(page: string, user: string, fecha: string) {
    this.srvF
      .getFacturasPageByFechaUser(
        this.paginaActual.toString(),
        this.user,
        this.fecha
      )
      .subscribe((f) => {
        this.facturas = f.content as Factura[];
        this.totalRegistros = f.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }
  delete(factura: Factura): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas  seguro?",
        text: `¿Seguro que quieres eliminar esta factura ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.srvF.delete(factura.id).subscribe((response) => {
            this.obtenerFacturas(
              this.paginaActual.toString(),
              this.user,
              this.fecha
            );
            swalWithBootstrapButtons.fire(
              "Factura Eliminada!",
              `Factura  eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }

  public consultarFacturas() {
    this.fecha = this.formatoFecha(this.fecha);
    if (this.user == undefined) {
      this.obtenerFacturas(this.paginaActual.toString(), "", this.fecha);
    } else {
      this.obtenerFacturas(this.paginaActual.toString(), this.user, this.fecha);
    }
  }
  public formatoFecha(fecha: string) {
    return this.miDatePipe.transform(fecha, "yyyy-MM-dd");
  }
}
