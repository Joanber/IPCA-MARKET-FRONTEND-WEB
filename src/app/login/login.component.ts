import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password = '';
  esValido = true;
  
  constructor(
    private  router: Router,
    private usuarioService:UsuarioService
  ) { }

  ngOnInit() {
  }

  login(){
    let res=this.usuarioService.login(
      this.username,this.password
    )

    res.subscribe(
      user=>{
        this.router.navigate(['home']);
        console.log(user.token);
      },
      err=>{
        console.log('Fallo al loguearse');
        console.log(err);
        this.esValido=false
      }
    )
  }
 
  cerrarError() {
    this.esValido = true;
  }

}
