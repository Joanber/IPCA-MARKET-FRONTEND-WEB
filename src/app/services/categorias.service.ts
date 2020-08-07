import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../DB_CONFIG/bdConig';
import { Categoria } from '../models/categoria';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  constructor( private http: HttpClient ) { }
  protected baseEndpoint = BASE_ENDPOINT + '/categorias';
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseEndpoint}/`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseEndpoint}/`, categoria).pipe(
      map((response:any)=> response.categoria as Categoria),
      catchError(e => {
        if (e.status ==400) {
          return throwError(e);
        }
        Swal.fire('Error al crear la categoría: ',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  editarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseEndpoint}/${categoria.id}`, categoria).pipe(
      map((response:any)=> response.categoria as Categoria),
      catchError(e => {
        if (e.status ==400) {
          return throwError(e);
        }
        Swal.fire('Error al editar la categoría: ',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  eliminar(id:number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.baseEndpoint}/${id}`).pipe(
      catchError(e =>{
        Swal.fire('Error al eliminar la categoría ',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  getCategoria(id:number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseEndpoint}/${id}`);
  }
}
