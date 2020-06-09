import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../../services/personas.service';
import { Persona } from 'src/app/models/persona';
import { BASE_ENDPOINT } from 'src/app/DB_CONFIG/bdConig';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.css']
})
export class PersonasListComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + '/personas';

  constructor( private personaService: PersonasService ) { }

  personas: Persona[];

  async ngOnInit() {
    this.getPersonas();
  }
getPersonas():void{
  this.personaService.getPersonas().subscribe(
    personas =>this.personas =personas
  )
}

  buscarPersona(termino:string){
    if (termino.length > 0) {
      this.personaService.getPersonasFiltradas(termino).subscribe(
        personas => this.personas=personas
      ) 
    }else{
      this.getPersonas()
    }
    
  }

  delete(persona: Persona): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas  seguro?',
      text: `¿Seguro que quieres eliminar a  ${persona.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.personaService.delete(persona.id).subscribe(
          response => {
            this.personas = this.personas.filter(per => per !== persona)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Persona ${persona.nombre} eliminada correctamente!`,
              'success'
            )
          }
        )
      }
    })
  }
  

}
