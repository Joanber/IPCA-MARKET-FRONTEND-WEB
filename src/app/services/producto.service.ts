import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../DB_CONFIG/bdConig';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  protected baseEndpoint = BASE_ENDPOINT + '/productos';

  constructor( private http: HttpClient) { }
  getproductoByCodigoBarras(codigo:string): Observable<Producto>{
    return this.http.get<Producto>(`${this.baseEndpoint}/codigo/${codigo}`)
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.baseEndpoint}/`);
  }

  editarSinFoto(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.baseEndpoint}/${producto.id}`, producto).pipe(
      map((response:any)=> response.producto as Producto),
      catchError(e => {
        if (e.status ==400) {
          return throwError(e);
        }
        Swal.fire('Error al editar producto',e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }


  crearSinFoto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.baseEndpoint}/`, producto).pipe(
      map((response:any)=> response.producto as Producto),
      catchError(e => {
        if (e.status ==400) {
          return throwError(e);
        }
        Swal.fire('Error al crear producto',e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }


  eliminarSinFoto(id:number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.baseEndpoint}/${id}`).pipe(
      catchError(e =>{
        Swal.fire('Error al eliminar el producto ',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  editarCantidad(producto:Producto):Observable<Producto>{
    return  this.http.put<Producto>(`${this.baseEndpoint}/codigo/${producto.codigo_barras}`,producto).pipe(
      map((response:any) => response.producto as Producto),
     catchError(e => {
       if (e.status == 400) {
         return throwError(e);
       }
       Swal.fire('Error al editar producto',e.error.mensaje,'error');
       return throwError(e);
     })
    )
  }


  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseEndpoint}/${id}`);
  }
}
