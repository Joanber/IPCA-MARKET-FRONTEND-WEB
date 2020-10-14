import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import Swal from "sweetalert2";
import { BASE_ENDPOINT } from "../DB_CONFIG/bdConig";
import { Factura } from "../models/factura";
import { Producto } from "../models/producto";

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
}
