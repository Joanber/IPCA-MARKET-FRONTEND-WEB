import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BASE_ENDPOINT } from 'src/app/DB_CONFIG/bdConig';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personas-add',
  templateUrl: './personas-add.component.html',
  styleUrls: ['./personas-add.component.css'],
  providers: [DatePipe]
})
export class PersonasAddComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + '/personas';
  private fotoSeleccionada: File;
  public imageSrc;
  public titulo:string='Crear Persona'
 
  public persona= new Persona()
  constructor(private srvP:PersonasService, private router:Router,private route:ActivatedRoute,private miDatePipe: DatePipe) { }
 
  ngOnInit() {
    this.cargarPersona();
  }

  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
      Swal.fire(
        'Error al seleccionar la foto:', 
        'El archivo debe ser del tipo imagen',
        'error');
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
      console.log(this.persona);
    }

   
  }

 

  public cargarPersona():void{
    this.route.paramMap.subscribe(params =>{
      const id:number = +params.get('id');
      if (id) {
        this.titulo='Actualizar Persona';
        this.srvP.getPersona(id).subscribe( persona =>{
          this.persona=persona
          console.log(this.persona);
        }
        )
      }
    })
  }

  public crear():void {
    if (!this.fotoSeleccionada) {
      this.srvP.crearSinFoto(this.persona).subscribe(
        persona => {
          this.irPersonas();
          Swal.fire('Nueva Persona',`${persona.nombre} creado con exito!`,'success');
        }
      )
    }else{
      const fechaFormateada = this.miDatePipe.transform(this.persona.fecha, 'yyyy-MM-dd');
      this.persona.fecha=fechaFormateada;
      this.srvP.crearConFoto(this.persona,this.fotoSeleccionada).subscribe(
        persona => {
          console.log(persona);
          Swal.fire('Nueva Persona',`¡${persona.nombre} creado con exito!`,'success');
          this.irPersonas();
        }
      )
    }
  }

  public editar():void {
    if (!this.fotoSeleccionada) {
      this.srvP.editarSinFoto(this.persona).subscribe(
        persona => {
        console.log('persona sin foto', persona);
          this.irPersonas();
          Swal.fire('Actualizar Persona',`¡${persona.nombre} actualizado con exito!`,'success');
        }
      )
    }else if(!this.fotoSeleccionada && this.persona.fotoHashCode!=null){
      const hashcode:number=this.persona.fotoHashCode
      this.persona.fotoHashCode=hashcode;
      this.srvP.editarConFoto(this.persona,this.fotoSeleccionada).subscribe(
        persona => {
          console.log('persona con foto',persona);
          Swal.fire('Actualizar Persona',`¡${persona.nombre} actualizado con exito!`,'success');
          this.irPersonas();
        }
      )

    }else{
      this.srvP.editarConFoto(this.persona,this.fotoSeleccionada).subscribe(
        persona => {
          console.log('persona con foto',persona);
          Swal.fire('Actualizar Persona',`¡${persona.nombre} actualizado con exito!`,'success');
          this.irPersonas();
        }
      )

    }
  }
  irPersonas(){
    this.router.navigate(['/dashper/personas'])
  }
 

}
