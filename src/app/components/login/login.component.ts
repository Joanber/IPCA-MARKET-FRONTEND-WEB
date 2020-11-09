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
  usuario: Usuario;
  esValido = true;
  invalido = "";

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire(
        "Login",
        `Hola ${this.authService.usuario.username} ya estás autenticado!`,
        "info"
      );
      this.router.navigate(["/home"]);
    }
  }

  cerrarError() {
    this.esValido = true;
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      this.esValido = false;
      this.invalido = "Username y/o Password vacías";
      return;
    } else {
      this.authService.login(this.usuario).subscribe(
        (response) => {
          console.log(response);
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
