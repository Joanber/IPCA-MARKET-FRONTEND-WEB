import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Persona } from "src/app/models/persona";
import { PersonasService } from "src/app/services/personas.service";
import { Rol } from "src/app/models/rol";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-usuario-add",
  templateUrl: "./usuario-add.component.html",
  styleUrls: ["./usuario-add.component.css"],
})
export class UsuarioAddComponent implements OnInit {
  public titulo: string = "Nuevo Usuario";
  public usuario = new Usuario();
  public personas: Persona[];
  public roles: Rol[] = [];
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  public isError = false;
  public existe = false;
  public existeUsername = false;
  public mensaje: string;
  public mostrarInputPass = true;

  constructor(
    private srvU: UsuarioService,
    private srvP: PersonasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.srvU.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
    this.cargarUsuario();
    this.srvP.getPersonas().subscribe((personas) => (this.personas = personas));
    console.log(this.mostrarInputPass, "ultimo");
  }

  public cargarUsuario(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      console.log(this.mostrarInputPass, "sin id");
      if (id) {
        this.mostrarInputPass = false;
        this.titulo = "Actualizar Usuario";
        this.srvU.getUsuario(id).subscribe((usuario) => {
          this.usuario = usuario;
          this.usuario.confirmPassword = this.usuario.password;
          this.usuario.roles.forEach((rol1) => {
            this.roles.forEach((rol2) => {
              if (rol1.id === rol2.id) {
                rol2.check = true;
              }
            });
          });
        });
      } else {
        this.mostrarInputPass = true;
      }
    });
  }
  onChange(event, rol: Rol) {
    const checked = event.target.checked;
    if (checked) {
      this.usuario.roles.push(rol);
    } else {
      this.usuario.roles = this.usuario.roles.filter(
        (r) => r.nombre !== rol.nombre
      );
    }
  }

  public create(form: NgForm): void {
    if (form.valid && this.usuario.roles.length > 0) {
      if (this.existe == false) {
        this.srvU.crear(this.usuario).subscribe((usuario) => {
          console.log(this.usuario);
          this.irUsuarios();
          Swal.fire(
            "Nuevo Usuario",
            `!${usuario.username} creado con exito!`,
            "success"
          );
        });
      } else {
        this.onIsError2();
      }
    } else {
      this.onIsError();
    }
  }
  public editar(form: NgForm): void {
    if (form.valid && this.usuario.roles.length > 0) {
      this.srvU.editar(this.usuario).subscribe((usuario) => {
        this.usuario.password = null;
        this.irUsuarios();
        Swal.fire(
          "Actualizar Usuario",
          `!${usuario.username} actualizado con exito!`,
          "success"
        );
      });
    } else {
      this.onIsError();
    }
  }

  irUsuarios() {
    this.router.navigate(["/dashper/usuarios"]);
  }
  compararPersona(o1: Persona, o2: Persona): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }
  onIsError2(): void {
    this.existeUsername = true;
    setTimeout(() => {
      this.existeUsername = false;
    }, 1000);
  }
  existeUsernameUsuario(username: string): void {
    if (username.length > 0) {
      this.srvU.getUsernameExiste(username).subscribe((usuario) => {
        if (usuario != null) {
          this.mensaje = "!Username ya existente¡";
          return (this.existe = true);
        } else {
          return (this.existe = false);
        }
      });
    } else {
      this.existe = false;
    }
  }
}
