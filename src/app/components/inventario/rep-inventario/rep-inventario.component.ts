import { Component, OnInit } from '@angular/core';
import { Categoria } from "src/app/models/categoria";
import { FacturasService } from '../../../services/facturas.service';
import { CategoriasService } from "src/app/services/categorias.service";
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt, Columns, Rect, Canvas} from 'pdfmake-wrapper';



@Component({
  selector: 'app-rep-inventario',
  templateUrl: './rep-inventario.component.html',
  styleUrls: ['./rep-inventario.component.css']
})
export class RepInventarioComponent implements OnInit {

  facturaLista: any[] = [];
  cont: number = 0;
  total: number = 0;
  lista: Categoria[];
  categoria: string;
  constructor( private fs: FacturasService,
    private catService: CategoriasService) {
    this.fs.getProductosInventario().subscribe( data => { 
      this.facturaLista = data;
      for (const producto of this.facturaLista) {
        this.cont = producto.precio * producto.cantidad_maxima;
        this.total += this.cont;
      }
    });
  }

  ngOnInit() {
    this.catService.getCategorias().subscribe((data) => {
      this.lista = data;
    });
  }

  reportePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Inventario',
      author: 'IPCA',
      subject: 'Productos reporte',
    });
    pdf.add(
      pdf.ln(1)
    );
    pdf.add(
       new Txt('Inventario').alignment('center').bold().italics().end
    );

    pdf.add(
      new Columns([ 'Codigo de barras','Nombre','Precio', 'Existencia', 'Inv Minimo' ]).columnGap(3).end
    );
    this.facturaLista.forEach( registro => {
      pdf.add(
        new Columns([ registro.codigo_barras,registro.nombre,registro.precio,  registro.cantidad_maximo, registro.cantidad_minima ]).columnGap(3).end
      );
    });
    pdf.footer(`${ new Date() }`);
    pdf.watermark('IPCA');
    pdf.create().open()
  }


  filtrarCategoria() {
    this.cont = 0;
    this.total = 0;
    if (this.categoria !== undefined) {
      this.fs.getProductosByCategoria(this.categoria).subscribe( data => { 
        this.facturaLista = data;
        for (const producto of this.facturaLista) {
          this.cont = producto.precio * producto.cantidad_maxima;
          this.total += this.cont;
        }
      });
    } else {
      this.fs.getProductosInventario().subscribe( data => { 
        this.facturaLista = data;
        for (const producto of this.facturaLista) {
          this.cont = producto.precio * producto.cantidad_maxima;
          this.total += this.cont;
        }
      });
    }
    
  }


  



}
