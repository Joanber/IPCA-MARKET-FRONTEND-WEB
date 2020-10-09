import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { BASE_ENDPOINT } from "../DB_CONFIG/bdConig";




@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  protected baseEndpoint = BASE_ENDPOINT + "/facturas";

  constructor(private http: HttpClient) { }
  getVentas(fechaInicio: string, fechaFin: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseEndpoint}/filtrar-ventasProducto/${fechaInicio}/${fechaFin}`);
  }
}
