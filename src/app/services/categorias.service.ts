import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../DB_CONFIG/bdConig';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor( private http: HttpClient ) { }
  protected baseEndpoint = BASE_ENDPOINT + '/categorias';
  getCategorias() {
    return this.http.get<Categoria>(`${this.baseEndpoint}/`);
  }
}
