import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public titulo:string = 'Crear Producto';
  constructor() { }

  public producto = new Producto;
  ngOnInit() {
  }
  cargarProdcuto() {

  }
}
