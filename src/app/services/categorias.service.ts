import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_ENDPOINT } from "../DB_CONFIG/bdConig";
import { Categoria } from "../models/categoria";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class CategoriasService {
  constructor(private http: HttpClient) {}
  protected baseEndpoint = BASE_ENDPOINT + "/categorias";
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseEndpoint}/`);
  }

  getCategoriasFiltro(termino: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${this.baseEndpoint}/filtrar/${termino}`
    );
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseEndpoint}/`, categoria).pipe(
      map((response: any) => response.categoria as Categoria),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire("Error al crear la categoría: ", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  crearConFoto(categoria: Categoria, archivo: File): Observable<Categoria> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("nombre", categoria.nombre);
    return this.http
      .post<Categoria>(`${this.baseEndpoint}` + "/crear-con-foto", formData)
      .pipe(
        map((response: any) => response.producto as Categoria),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al crear categoria", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }

  getCategoriasPage(page: string): Observable<any> {
    return this.http.get(this.baseEndpoint + "/page/" + page).pipe(
      tap((response: any) => {
        (response.content as Categoria[]).forEach((categoria) => {
          console.log(categoria.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Categoria[]).map((producto) => {
          return producto;
        });
        return response;
      })
    );
  }

  editarConFoto(categoria: Categoria, archivo: File): Observable<Categoria> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("nombre", categoria.nombre);
    return this.http
      .put<Categoria>(
        `${this.baseEndpoint}` + `/editar-con-foto/${categoria.id}`,
        formData
      )
      .pipe(
        map((response: any) => response.producto as Categoria),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al editar categoria", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }

  editarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .put<Categoria>(`${this.baseEndpoint}/${categoria.id}`, categoria)
      .pipe(
        map((response: any) => response.categoria as Categoria),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al editar la categoría: ", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }

  eliminar(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.baseEndpoint}/${id}`).pipe(
      catchError((e) => {
        Swal.fire("Error al eliminar la categoría ", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseEndpoint}/${id}`);
  }

  getCategoriasFiltradas(termino: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${this.baseEndpoint}/filtrar/${termino}`
    );
  }
}
