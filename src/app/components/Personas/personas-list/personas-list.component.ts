import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../../services/personas.service';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.css']
})
export class PersonasListComponent implements OnInit {

  constructor( private personaService: PersonasService ) { }

  listaPersonas: Persona[];

  ngOnInit() {
    this.personaService.getPersonas().subscribe( data => {
      // console.log(data);
      this.listaPersonas = data;
    });
  }

}
