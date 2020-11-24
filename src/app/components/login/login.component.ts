import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "src/app/services/login_services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponen implements OnInit {
  public usuario: Usuario;
  public esValido = true;
  public invalido = "";

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire(
        "Login",
        `Hola ${this.authService.usuario.username} ya iniciaste sesión!`,
        "info"
      );
      this.router.navigate(["/home"]);
    }
  }

  public cerrarError() {
    this.esValido = true;
  }

  public login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      this.esValido = false;
      this.invalido = "Username y/o Password vacías";
      return;
    } else {
      this.authService.login(this.usuario).subscribe(
        (response) => {
          this.authService.guardarUsuario(response);
          this.authService.guardarToken(response.accessToken);
          this.router.navigate(["/home"]);
        },
        (err) => {
          if (err.status == 500) {
            this.esValido = false;
            this.invalido = "Username y/o Password incorectas!";
            return;
          }
        }
      );
    }
  }
}
