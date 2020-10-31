import { Component, OnInit, ViewChild } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import { PersonasService } from "src/app/services/personas.service";
import Swal from "sweetalert2";
import { MatPaginator, PageEvent } from "@angular/material";

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
  constructor(private usuarioService: UsuarioService) {}

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
