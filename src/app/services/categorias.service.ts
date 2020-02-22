import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor( private http: HttpClient ) { }

  getCategorias() {
    const url = 'http://localhost:2727/categoria/categorias';
    return this.http.get<Categoria[]>(url);
  }
}
