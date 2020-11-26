import { Component, OnInit } from '@angular/core';
import { Categoria } from "src/app/models/categoria";
import { FacturasService } from '../../../services/facturas.service';
import { CategoriasService } from "src/app/services/categorias.service";
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt, Columns } from 'pdfmake-wrapper';
import { UtilsReportService } from '../../../services/utils-report.service';



@Component({
  selector: 'app-rep-inventario',
  templateUrl: './rep-inventario.component.html',
  styleUrls: ['./rep-inventario.component.css']
})
export class RepInventarioComponent implements OnInit {

  public facturaLista: any[] = [];
  public cont: number = 0;
  public total: number = 0;
  public lista: Categoria[];
  public categoria: string;
  constructor( private fs: FacturasService,
    private srvUr: UtilsReportService,
    private catService: CategoriasService) {
    this.catService.getCategorias().subscribe((data) => {
      this.lista = data;
    });
    
  }

  ngOnInit() {
    this.fs.getProductosInventario().subscribe( data => { 
      this.obtenerData(data);
    });
  }

  public reportePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageSize("A4");
    pdf.info({
      title: "Reporte de Inventario",
      author: "IPCA",
      subject: "Inventario reporte",
    });
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Instituto de Parálisis Cerebral del Azuay-IPCA")
        .alignment("left")
        .bold()
        .italics().end
    );
    pdf.add(new Txt(`${this.srvUr.fecha()}`).alignment("right").italics().end);
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Reporte de Inventario").alignment("center").bold().italics().end
    );
    pdf.add(pdf.ln(1));

    pdf.add(
      new Columns([ 'Codigo de barras','Nombre','Precio', 'Existencia', 'Inv Minimo' ]).columnGap(3).style("text-center").bold().end
    );
    this.facturaLista.forEach( registro => {
      pdf.add(
        new Columns([ registro.codigo_barras,
          registro.nombre,
          `$${this.srvUr.formateaValor(registro.precio)}`,
          registro.cantidad_maxima,
          registro.cantidad_minima 
        ]).columnGap(3).end
      );
    });
    pdf.create().open()
  }


  public filtrarCategoria() {
    this.cont = 0;
    this.total = 0;
    if (this.categoria !== undefined) {
      this.fs.getProductosByCategoria(this.categoria).subscribe( data => { 
        this.obtenerData(data);
      });
    } else {
      this.fs.getProductosInventario().subscribe( data => { 
        this.obtenerData(data);
      });
    }
    
  }

  public async obtenerData(data) {
    this.facturaLista = await data;
    for (const producto of this.facturaLista) {
      this.cont = producto.precio * producto.cantidad_maxima;
      this.total += this.cont;
    }
  }


  



}
