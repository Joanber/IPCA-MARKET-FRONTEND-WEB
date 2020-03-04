import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from 'src/app/models/UsuarioLogin';

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
    )
  }
  estaLogueado():boolean{
    let user=sessionStorage.getItem('userssp')
    return !(user==null);
  }
  getToken():string {
    if(this.estaLogueado()){
      return sessionStorage.getItem('usertokenss');
    }else{
      return '';
    }
  }
  salir(){
    sessionStorage.removeItem('userssp');
    sessionStorage.removeItem('usertokenss')
  }
}
