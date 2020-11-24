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
  public fieldTextType: boolean;
  public repeatFieldTextType: boolean;
  private existePassword: boolean;
  public existePass = false;
  public existe = false;
  constructor(
    private srvU: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.cargarUsername();
  }
  public irUsuarios() {
    this.router.navigate(["/dashper/usuarios"]);
  }
  public async cargarUsername() {
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
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  public filtrarPassword(passactual: string) {
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
  private onIsError(): void {
    this.existePass = true;
    setTimeout(() => {
      this.existePass = false;
    }, 1000);
  }
}
