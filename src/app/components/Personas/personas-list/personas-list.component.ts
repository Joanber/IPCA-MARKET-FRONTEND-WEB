import { Component, OnInit } from "@angular/core";
import { PersonasService } from "../../../services/personas.service";
import { Persona } from "src/app/models/persona";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-personas-list",
  templateUrl: "./personas-list.component.html",
  styleUrls: ["./personas-list.component.css"],
})
export class PersonasListComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + "/personas";
  paginator: any;

  constructor(
    private personaService: PersonasService,
    private route: ActivatedRoute
  ) {}

  personas: Persona[];

  async ngOnInit() {
    this.getPersonasPage();
  }
  getPersonasPage(): void {
    this.route.paramMap.subscribe((params) => {
      let page: number = +params.get("page");
      if (!page) {
        page = 0;
      }
      this.personaService
        .getPersonasPage(page)
        .pipe(
          tap((response) => {
            (response.content as Persona[]).forEach((persona) => {});
          })
        )
        .subscribe((response) => {
          this.personas = response.content as Persona[];
          this.paginator = response;
        });
    });
  }
  getPersonas(): void {
    this.personaService
      .getPersonas()
      .subscribe((personas) => (this.personas = personas));
  }

  buscarPersona(termino: string) {
    if (termino.length > 0) {
      this.personaService
        .getPersonasFiltradas(termino.toUpperCase())
        .subscribe((personas) => (this.personas = personas));
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
            this.personas = this.personas.filter((per) => per !== persona);
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
    }
  }
}
