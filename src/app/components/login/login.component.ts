import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showMessage: boolean = false;
  public usuario: Usuario = {
    idUsuario:'',
    nombreUsuario: '',
    passwordUsuario: '',
    idPersona:null
  }
  constructor(
    private  router:Router
  ) { }

  ngOnInit() {
  }
  clickIniciarSesion(){
    this.router.navigate(['home']);
  }

}
