import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Persona } from "../models/persona";
import { BASE_ENDPOINT } from "../DB_CONFIG/bdConig";
import { Observable, pipe, throwError } from "rxjs";
import { Router } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class PersonasService {
  protected baseEndpoint = BASE_ENDPOINT + "/personas";

  constructor(private http: HttpClient, private router: Router) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseEndpoint}/`);
  }
  getPersonasFiltradas(termino: string): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseEndpoint}/filtrar/${termino}`);
  }
  getPersonasPage(page: number): Observable<any> {
    return this.http.get(this.baseEndpoint + "/page/" + page).pipe(
      tap((response: any) => {
        (response.content as Persona[]).forEach((persona) => {});
      }),
      map((response: any) => {
        (response.content as Persona[]).map((persona) => {
          return persona;
        });
        return response;
      })
    );
  }
  crearConFoto(persona: Persona, archivo: File): Observable<Persona> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("cedula", persona.cedula);
    formData.append("nombre", persona.nombre);
    formData.append("apellido", persona.apellido);
    formData.append("telefono", persona.telefono);
    formData.append("direccion", persona.direccion);
    formData.append("fecha", persona.fecha);
    formData.append("email", persona.email);
    return this.http
      .post<Persona>(this.baseEndpoint + "/crear-con-foto", formData)
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al crear persona", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseEndpoint}/${id}`);
  }
  crearSinFoto(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.baseEndpoint}/`, persona).pipe(
      map((response: any) => response.persona as Persona),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire("Error al crear persona", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  editarSinFoto(persona: Persona): Observable<Persona> {
    return this.http
      .put<Persona>(`${this.baseEndpoint}/${persona.id}`, persona)
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al editar persona", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }
  editarConFoto(persona: Persona, archivo: File): Observable<Persona> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("cedula", persona.cedula);
    formData.append("nombre", persona.nombre);
    formData.append("apellido", persona.apellido);
    formData.append("telefono", persona.telefono);
    formData.append("direccion", persona.direccion);
    formData.append("fecha", persona.fecha);
    formData.append("email", persona.email);
    return this.http
      .put<Persona>(
        `${this.baseEndpoint}/editar-con-foto/${persona.id}`,
        formData
      )
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al editar persona", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.baseEndpoint}/${id}`).pipe(
      catchError((e) => {
        Swal.fire("Error al eliminar a la persona", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }
}
