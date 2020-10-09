import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [DatePipe]
})
export class ReportesComponent implements OnInit {

  constructor(private miDatePipe: DatePipe) { }

  listRegistros = [];

  ngOnInit() {
  }

  fechaInicio: string = null;
  fechaFin: string = null;

  ver() {
    const fechaInicio = this.miDatePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    const fechaFin = this.miDatePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    console.log(fechaInicio);
    console.log(fechaFin);

    
  }


}
