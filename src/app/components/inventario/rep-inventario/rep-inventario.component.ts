import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../../services/facturas.service';

@Component({
  selector: 'app-rep-inventario',
  templateUrl: './rep-inventario.component.html',
  styleUrls: ['./rep-inventario.component.css']
})
export class RepInventarioComponent implements OnInit {

  facturaLista: any[] = [];
  cont: number = 0;
  total: number = 0;

  constructor( private fs: FacturasService ) {
    this.fs.getProductosInventario().subscribe( data => { 
      this.facturaLista = data;
      for (const producto of this.facturaLista) {
        console.log(producto)
        this.cont = producto.precio * producto.cantidad_maxima;
        this.total += this.cont;
      }
    });
  }

  ngOnInit() {
  }


  



}
