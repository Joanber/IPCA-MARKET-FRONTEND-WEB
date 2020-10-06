import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [DatePipe]
})
export class ReportesComponent implements OnInit {

  constructor() { }

  listRegistros = [];

  ngOnInit() {
  }

}
