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
  public fieldTextType: boolean;
  public repeatFieldTextType: boolean;
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

  async ngOnInit() {
    this.roles = await this.srvU
      .getRoles()
      .toPromise()
      .then((roles) => (this.roles = roles));
    this.cargarUsuario();
    this.personas = await this.srvP
      .getPersonas()
      .toPromise()
      .then((personas) => (this.personas = personas));
  }

  public async cargarUsuario() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      if (id) {
        this.mostrarInputPass = false;
        this.titulo = "Actualizar Usuario";
        this.srvU.getUsuario(id).subscribe((usuario) => {
          this.usuario = usuario;
          for (let rol1 of this.usuario.roles) {
            for (let rol2 of this.roles) {
              if (rol1.id === rol2.id) {
                rol2.check = true;
              }
            }
          }
        });
      } else {
        this.mostrarInputPass = true;
      }
    });
  }
  public onChange(event, rol: Rol) {
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
      this.usuario.facturas = null;
      this.srvU.editar(this.usuario).subscribe((usuario) => {
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

  public irUsuarios() {
    this.router.navigate(["/dashper/usuarios"]);
  }
  public compararPersona(o1: Persona, o2: Persona): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  private onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }
  private onIsError2(): void {
    this.existeUsername = true;
    setTimeout(() => {
      this.existeUsername = false;
    }, 1000);
  }
  public existeUsernameUsuario(username: string): void {
    if (username.length > 3) {
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
