import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-cambiar-pass",
  templateUrl: "./cambiar-pass.component.html",
  styleUrls: ["./cambiar-pass.component.css"],
})
export class CambiarPassComponent implements OnInit {
  public usuario = new Usuario();
  public username: string;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  existePassword: boolean;
  existePass = false;
  existe = false;
  constructor(
    private srvU: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarUsername();
  }
  irUsuarios() {
    this.router.navigate(["/dashper/usuarios"]);
  }
  public cargarUsername(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      if (id) {
        this.srvU.getUsuario(id).subscribe((usuario) => {
          this.username = usuario.username;
        });
      }
    });
  }
  public create(form: NgForm): void {
    if (form.valid) {
      if (this.existe) {
        this.route.paramMap.subscribe((params) => {
          const id: number = +params.get("id");
          this.usuario.id = id;
          this.srvU.editarWithPassword(this.usuario).subscribe((usuario) => {
            this.irUsuarios();
            Swal.fire(
              "Cambiar Contraseña",
              `!Se cambió la contraseña con exito del usuario " ${this.username} " !`,
              "success"
            );
          });
        });
      } else {
        this.onIsError();
      }
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  filtrarPassword(passactual: string) {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      if (id && passactual.length > 7) {
        this.srvU.getBooleanPassword(id, passactual).subscribe((pass) => {
          this.existePassword = pass;
          if (this.existePassword) {
            return (this.existe = true);
          } else {
            return (this.existe = false);
          }
        });
      } else {
        this.existe = false;
      }
    });
  }
  onIsError(): void {
    this.existePass = true;
    setTimeout(() => {
      this.existePass = false;
    }, 1000);
  }
}
