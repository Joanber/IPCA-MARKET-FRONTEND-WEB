import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Persona } from 'src/app/models/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { Rol } from 'src/app/models/rol';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {
  public titulo: string = 'Crear Usuario'
  public usuario = new Usuario();
  public personas: Persona[];
  public roles: Rol[] = [];
  isTextFieldType: boolean;
  public isError = false;


  constructor(private srvU: UsuarioService, private srvP: PersonasService, private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder) { }

  async ngOnInit() {

    this.srvU.getRoles().subscribe(roles => { this.roles = roles })
    this.cargarUsuario()
    this.srvP.getPersonas().subscribe(personas => this.personas = personas);
  }

  public cargarUsuario(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.titulo = 'Actualizar Usuario';
        this.srvU.getUsuario(id).subscribe(usuario => {
          this.usuario = usuario;
          this.usuario.roles.forEach(rol1 => {
            this.roles.forEach(rol2 => {
              if (rol1.id === rol2.id) {
                rol2.check = true;
              }
            })
          })
        }
        )
      }
    })
  }
  onChange(event, rol: Rol) {
    const checked = event.target.checked;
    if (checked) {
      this.usuario.roles.push(rol);
      console.log(this.usuario, '->>>>>>>> CON NUEVOS ROLES', rol);
    } else {
      this.usuario.roles = this.usuario.roles.filter(r => r.nombre !== rol.nombre);
      console.log(this.usuario, '->>>>>>>> CON ROLES ELIMINADOS', rol);
    }

  }

  public create(form: NgForm): void {

    if (form.valid && this.usuario.roles.length > 0) {
      this.srvU.crear(this.usuario).subscribe(
        usuario => {
          console.log(this.usuario);
          this.irUsuarios();
          Swal.fire('Nuevo Usuario', `!${usuario.username} creado con exito!`, 'success');
        }
      )
    } else {
      this.onIsError();
    }
  }
  public editar(form: NgForm): void {
    if (form.valid && this.usuario.roles.length > 0) {
      this.srvU.editar(this.usuario).subscribe(
        usuario => {
          this.irUsuarios();
          Swal.fire('Actualizar Usuario', `!${usuario.username} actualizado con exito!`, 'success');
        }
      )
    } else {
      this.onIsError();
    }
  }


  irUsuarios() {
    this.router.navigate(['/dashper/usuarios'])
  }
  compararPersona(o1: Persona, o2: Persona): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;

    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }


}
