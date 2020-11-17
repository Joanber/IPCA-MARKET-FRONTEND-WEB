import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonasService } from "../../../services/personas.service";
import { Persona } from "src/app/models/persona";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, PageEvent } from "@angular/material";

@Component({
  selector: "app-personas-list",
  templateUrl: "./personas-list.component.html",
  styleUrls: ["./personas-list.component.css"],
})
export class PersonasListComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + "/personas";
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  personas: Persona[];
  todaspersonas: Persona[];
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  busqueda = true;
  constructor(
    private personaService: PersonasService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.getPersonasPage();
  }
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getPersonasPage();
  }
  private getPersonasPage() {
    this.personaService
      .getPersonasPage(this.paginaActual.toString())
      .subscribe((p) => {
        this.personas = p.content as Persona[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }

  buscarPersona(termino: string) {
    if (termino.length > 0) {
      this.personaService
        .getPersonasFiltradas(termino.toUpperCase())
        .subscribe((personas) => (this.personas = personas));
      this.busqueda = false;
    } else {
      this.getPersonasPage();
    }
  }

  delete(persona: Persona): void {
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
        text: `¿Seguro que quieres eliminar a  ${persona.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.personaService.delete(persona.id).subscribe((response) => {
            this.getPersonasPage();
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              `Persona ${persona.nombre} eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }
  public cargarPersonasDefault(event: any) {
    let termino: string = event.target.value as string;
    if (termino.length == 0) {
      this.getPersonasPage();
      this.busqueda = true;
    }
  }
  
}
