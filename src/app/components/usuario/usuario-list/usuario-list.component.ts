import { Component, OnInit, ViewChild } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import { PersonasService } from "src/app/services/personas.service";
import Swal from "sweetalert2";
import { Cell, Columns, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { UtilsReportService } from "src/app/services/utils-report.service";

import { MatPaginator, PageEvent } from "@angular/material";
import { AuthService } from "src/app/services/login_services/auth.service";
import { Rol } from "src/app/models/rol";

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"],
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[];
  todosUsuarius: Usuario[];
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  busqueda = true;
  constructor(
    private usuarioService: UsuarioService,
    public authService: AuthService,
    private srvUr: UtilsReportService
  ) {}

  async ngOnInit() {
    this.getUsuariospage();
  }
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getUsuariospage();
  }
  private getUsuariospage() {
    this.usuarioService
      .getUsuariosPage(this.paginaActual.toString())
      .subscribe((u) => {
        this.usuarios = u.content as Usuario[];
        this.totalRegistros = u.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }
  getUsuarios(): void {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  imprimirPDF() {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: "Reporte de Usuarios",
      author: "IPCA",
      subject: "Usuarios reporte",
    });
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Instituto de Parálisis Cerebral del Azuay-IPCA")
        .alignment("left")
        .bold()
        .italics().end
    );
    pdf.add(new Txt(`${this.srvUr.fecha()}`).alignment("right").italics().end);
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Reporte de Usuarios").alignment("center").bold().italics().end
    );
    pdf.add(pdf.ln(1));

    pdf.add(
      new Columns([
        "Username",
        "Cedula",
        "Nombre - Apellido",
        "Direccion",
        "Roles",
      ]).columnGap(3).end
    );
    this.usuarios.forEach((user) => {
      pdf.add(
        new Columns([
          user.username,
          user.persona.cedula,
          user.persona.nombre + " " + user.persona.apellido,
          user.persona.direccion,
          user.roles[0].nombre,
        ]).columnGap(1).end
      );
    });

    pdf.create().open();
  }

  buscarUsuario(termino: string) {
    if (termino.length > 0) {
      this.usuarioService
        .getUsuariosFiltrados(termino)
        .subscribe((usuarios) => (this.usuarios = usuarios));
      this.busqueda = false;
    } else {
      this.getUsuariospage();
    }
  }

  delete(usuario: Usuario): void {
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
        text: `¿Seguro que quieres eliminar a  ${usuario.username}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.usuarioService.delete(usuario.id).subscribe((response) => {
            this.getUsuariospage();
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              `Usuario ${usuario.username} eliminado correctamente!`,
              "success"
            );
          });
        }
      });
  }
  public cargarUsuariosDefault(event: any) {
    let termino: string = event.target.value as string;
    if (termino.length == 0) {
      this.getUsuariospage();
      this.busqueda = true;
    }
  }
}
