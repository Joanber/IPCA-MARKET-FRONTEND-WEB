import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personas-add',
  templateUrl: './personas-add.component.html',
  styleUrls: ['./personas-add.component.css']
})
export class PersonasAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  guardarPersona(form: any) {
    console.log(form);
  }

}
