import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  constructor( private prodService: ProductoService ) { }
  prodLista: Producto;
  ngOnInit() {
    this.prodService.getProductos().subscribe(data => {
      this.prodLista = data;
    });
  };
}
