import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from 'src/app/models/UsuarioLogin';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:2727/usuario/';

  login(username: string , password: string) {
    return this.http
    .post<UsuarioLogin>(
      'http://localhost:2727/login',{
        username,password
      }
    ).pipe(
      map(
        usuarioLogin => {
          sessionStorage.setItem('username',username);
          let tokenStr='Bearer '+usuarioLogin.token;
          sessionStorage.setItem('token',tokenStr)
          return usuarioLogin;
          console.log('hola '+usuarioLogin);
        }

      )
    )
  }
  estaLogueado():boolean{
    let user=sessionStorage.getItem('username')
    return !(user==null);
  }
  getToken():string {
    if(this.estaLogueado()){
      return sessionStorage.getItem('token');
    }else{
      return '';
    }
  }
  salir(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token')
  }
}
