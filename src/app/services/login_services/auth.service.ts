import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/DB_CONFIG/bdConig';
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected baseEndpoint = BASE_ENDPOINT + '/auth';

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(`${this.baseEndpoint}/login`, {
      username: credentials.username,
      password: credentials.password
    });
  }
}
