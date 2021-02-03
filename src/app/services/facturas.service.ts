import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import Swal from "sweetalert2";
import { BASE_ENDPOINT } from "../DB_CONFIG/bdConig";
import { Factura } from "../models/factura";
import { Producto } from "../models/producto";
import { ProductoBajoInventario } from "../models/ProductoBajoInventario";

@Injectable({
  providedIn: "root",
})
export class FacturasService {
  constructor(private http: HttpClient) {}
  protected baseEndpoint = BASE_ENDPOINT + "/facturas";
  getproductoByCodigoBarras(codigo: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.baseEndpoint}/filtrar-producto/${codigo}`
    );
  }
  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.baseEndpoint}/`, factura).pipe(
      map((response: any) => response.factura as Factura),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire("Error al crear factura", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }
  getProductosBajosEnInventario(): Observable<ProductoBajoInventario[]> {
    return this.http.get<ProductoBajoInventario[]>(
      `${this.baseEndpoint}/filtrar-productos-bajos-inventario`
    );
  }

  getVentas(
    fechaInicio: string,
    fechaFin: string,
    usuario: string
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${
        this.baseEndpoint
      }/filtrar-ventasProducto?desde=${fechaInicio}&hasta=${fechaFin}&user=${
        usuario || ""
      }`
    );
  }
  getProductosInventario() {
    return this.http.get<any[]>(
      `${this.baseEndpoint}/filtrar-productos-inventario`
    );
  }
  getProductosByCategoria(categoria: string) {
    return this.http.get<any[]>(
      `${this.baseEndpoint}/filtrar-productos-inventario-categoria/${categoria}`
    );
  }
  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.baseEndpoint}/`);
  }

  getFacturasPage(page: string): Observable<any> {
    return this.http.get(this.baseEndpoint + "/page/" + page).pipe(
      tap((response: any) => {
        (response.content as Factura[]).forEach((factura) => {});
      }),
      map((response: any) => {
        (response.content as Factura[]).map((factura) => {
          return factura;
        });
        return response;
      })
    );
  }

  getFacturasPageByFechaUser(
    page: string,
    usuario: string,
    fecha: string
  ): Observable<any> {
    return this.http
      .get(
        `${this.baseEndpoint}/facturaspage?page=${page}&username=${
          usuario || ""
        }&fecha=${fecha || ""}`
      )
      .pipe(
        tap((response: any) => {
          (response.content as Factura[]).forEach((factura) => {});
        }),
        map((response: any) => {
          (response.content as Factura[]).map((factura) => {
            return factura;
          });
          return response;
        })
      );
  }

  delete(id: number): Observable<Factura> {
    return this.http.delete<Factura>(`${this.baseEndpoint}/${id}`).pipe(
      catchError((e) => {
        Swal.fire("Error", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }
  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.baseEndpoint}/${id}`);
  }
  update(factura: Factura): Observable<Factura> {
    return this.http
      .put<Factura>(`${this.baseEndpoint}/${factura.id}`, factura)
      .pipe(
        map((response: any) => response.factura as Factura),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire("Error al editar factura", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }
}
