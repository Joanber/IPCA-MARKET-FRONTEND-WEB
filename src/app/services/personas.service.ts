import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor( private http: HttpClient ) { }

  getPersonas() {
    const url = 'http://localhost:2727/persona/personas';
    return this.http.get<Persona[]>(url);
  }
}
