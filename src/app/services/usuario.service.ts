import { Injectable } from "@angular/core";
import { BASE_ENDPOINT } from "../DB_CONFIG/bdConig";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Usuario } from "../models/usuario";
import { map, catchError, tap } from "rxjs/operators";
import Swal from "sweetalert2";
import { Rol } from "../models/rol";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  protected baseEndpoint = BASE_ENDPOINT + "/usuarios";

  constructor(private http: HttpClient, private router: Router) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseEndpoint}/`);
  }

  getUsuariosFiltrados(termino: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseEndpoint}/filtrar/${termino}`);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseEndpoint}/${id}`);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.baseEndpoint}/${usuario.id}`, usuario)
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al editar usuario", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }
  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseEndpoint}/`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire("Error al crear usuario", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseEndpoint}/roles`);
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseEndpoint}/${id}`).pipe(
      catchError((e) => {
        Swal.fire("Error al eliminar al usuario", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  getUsernameExiste(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.baseEndpoint}/existe-username-usuario/${username}`
    );
  }
  getUsuariosPage(page: string): Observable<any> {
    return this.http.get(this.baseEndpoint + "/page/" + page).pipe(
      tap((response: any) => {
        (response.content as Usuario[]).forEach((usuario) => {});
      }),
      map((response: any) => {
        (response.content as Usuario[]).map((usuario) => {
          return usuario;
        });
        return response;
      })
    );
  }
}
