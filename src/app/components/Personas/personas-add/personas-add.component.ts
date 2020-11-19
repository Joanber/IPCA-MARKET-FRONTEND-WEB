import { Component, OnInit } from "@angular/core";
import { Persona } from "src/app/models/persona";
import { PersonasService } from "src/app/services/personas.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { UtilsReportService } from "src/app/services/utils-report.service";

@Component({
  selector: "app-personas-add",
  templateUrl: "./personas-add.component.html",
  styleUrls: ["./personas-add.component.css"],
  providers: [DatePipe],
})
export class PersonasAddComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + "/personas";
  private fotoSeleccionada: File;
  public imageSrc;
  public titulo: string = "Nueva Persona";
  public existeCedula: boolean = false;
  public existe: boolean = false;
  public mensaje: string;
  public validador = true;

  public persona = new Persona();
  constructor(
    private srvP: PersonasService,
    private router: Router,
    private route: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.cargarPersona();
  }

  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf("image") < 0) {
      this.fotoSeleccionada = null;
      Swal.fire(
        "Error al seleccionar la foto:",
        "El archivo debe ser del tipo imagen",
        "error"
      );
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
      console.log(this.persona);
    }
  }

  public cargarPersona(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      if (id) {
        this.existeCedulaPersona("");
        this.titulo = "Actualizar Persona";
        this.srvP.getPersona(id).subscribe((persona) => {
          this.persona = persona;
        });
      }
    });
  }

  public crear(form: NgForm): void {
    if (!this.fotoSeleccionada) {
      if (this.existe == false) {
        this.srvP.crearSinFoto(this.persona).subscribe((persona) => {
          this.irPersonas();
          Swal.fire(
            "Nueva Persona",
            `${persona.nombre} creado con exito!`,
            "success"
          );
        });
      } else {
        this.onIsError();
      }
    } else {
      if (this.existe == false) {
        const fechaFormateada = this.miDatePipe.transform(
          this.persona.fecha,
          "yyyy-MM-dd"
        );
        this.persona.fecha = fechaFormateada;
        this.srvP
          .crearConFoto(this.persona, this.fotoSeleccionada)
          .subscribe((persona) => {
            console.log(persona);
            Swal.fire(
              "Nueva Persona",
              `¡${persona.nombre} creado con exito!`,
              "success"
            );
            this.irPersonas();
          });
      } else {
        this.onIsError();
      }
    }
  }

  public editar(): void {
    if (!this.fotoSeleccionada) {
      console.log(this.persona.cedula);
      this.srvP.editarSinFoto(this.persona).subscribe((persona) => {
        console.log("persona sin foto", persona);
        this.irPersonas();
        Swal.fire(
          "Actualizar Persona",
          `¡${persona.nombre} actualizado con exito!`,
          "success"
        );
      });
    } else if (!this.fotoSeleccionada && this.persona.fotoHashCode != null) {
      const hashcode: number = this.persona.fotoHashCode;
      this.persona.fotoHashCode = hashcode;
      this.srvP
        .editarConFoto(this.persona, this.fotoSeleccionada)
        .subscribe((persona) => {
          console.log("persona con foto", persona);
          Swal.fire(
            "Actualizar Persona",
            `¡${persona.nombre} actualizado con exito!`,
            "success"
          );
          this.irPersonas();
        });
    } else {
      this.srvP
        .editarConFoto(this.persona, this.fotoSeleccionada)
        .subscribe((persona) => {
          console.log("persona con foto", persona);
          Swal.fire(
            "Actualizar Persona",
            `¡${persona.nombre} actualizado con exito!`,
            "success"
          );
          this.irPersonas();
        });
    }
  }
  irPersonas() {
    this.router.navigate(["/dashper/personas"]);
  }

  existeCedulaPersona(cedula: string): void {
    console.log(cedula.length);
    if (cedula.length == 10) {
      this.srvP.getCedulaPersonaExiste(cedula).subscribe((persona) => {
        if (persona != null) {
          this.mensaje = "!Número de cédula ya existente¡";
          return (this.existe = true);
        } else {
          return (this.existe = false);
        }
      });
    } else {
      this.existe = false;
    }
  }

  onIsError(): void {
    this.existeCedula = true;
    setTimeout(() => {
      this.existeCedula = false;
    }, 1800);
  }
  validadorDeCedula(cedula: string) {
    let cedulaCorrecta = false;
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < cedula.length - 1; i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += parseInt((digito % 10) + "") + parseInt(digito / 10 + "");
        }
        suma = Math.round(suma);
        if (
          Math.round(suma % 10) == 0 &&
          Math.round(suma % 10) == verificador
        ) {
          cedulaCorrecta = true;
        } else if (10 - Math.round(suma % 10) == verificador) {
          cedulaCorrecta = true;
        } else {
          cedulaCorrecta = false;
        }
      } else {
        cedulaCorrecta = false;
      }
    } else {
      cedulaCorrecta = false;
    }
    this.validador = cedulaCorrecta;
  }
}
