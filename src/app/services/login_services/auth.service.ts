import { Injectable } from "@angular/core";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import { Usuario } from "src/app/models/usuario";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Rol } from "src/app/models/rol";
import { TempFacturaService } from "../temp-factura.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;
  public rolesAll: any = ["ROLE_ADMIN", "ROLE_DOCENTE", "ROLE_ESTUDIANTE"];
  public rolesNotAll: any = ["ROLE_ADMIN", "ROLE_DOCENTE"];

  protected baseEndpoint = BASE_ENDPOINT + "/auth";

  constructor(private http: HttpClient, private temFacSer: TempFacturaService) {
    this.rolesAll = this.rolesAll as Rol[];
    this.rolesNotAll = this.rolesNotAll as Rol[];
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem("usuario") != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.baseEndpoint}/login`, {
      username: usuario.username,
      password: usuario.password,
    });
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  isAuthenticated(): boolean {
    if (this.token != null) {
      return true;
    }
    return false;
  }

  hasRole(rol: Rol) {
    let roles = this.usuario.roles;
    return roles.findIndex((a) => a === rol) > -1;
  }
  hasAnyRoles(roles: Rol[]): boolean {
    for (let i = 0; i <= roles.length; i++) {
      if (this.hasRole(roles[i])) {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    this.usuario.facturas = null;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    this.temFacSer.borrarFacturas();
    sessionStorage.clear();
  }
  guardarUsuario(response: any): void {
    this._usuario = new Usuario();
    this._usuario.username = response.username;
    this.usuario.id = response.id;
    this._usuario.roles = response.roles;
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
  }
}
