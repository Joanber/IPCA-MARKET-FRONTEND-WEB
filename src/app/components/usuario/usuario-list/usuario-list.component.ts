import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  usuarios:Usuario[];
  

  constructor( private usuarioService:UsuarioService) { }

   async ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios():void{
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    )
  }

  buscarUsuario(termino:string){
    if (termino.length > 0) {
      this.usuarioService.getUsuariosFiltrados(termino).subscribe(
        usuarios => this.usuarios=usuarios
      )
    }else{
      this.getUsuarios();
    }
  }
  
  
  delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estas  seguro?',
      text: `¿Seguro que quieres eliminar a  ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(user => user !== usuario)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Usuario ${usuario.username} eliminado correctamente!`,
              'success'
            )
          }
        )
      }
    })
  }


}
