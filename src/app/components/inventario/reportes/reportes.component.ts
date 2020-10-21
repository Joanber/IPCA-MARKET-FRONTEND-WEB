import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FacturaService } from "src/app/services/factura.service";
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt, Columns, Rect, Canvas} from 'pdfmake-wrapper';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [DatePipe]
})
export class ReportesComponent implements OnInit {

  listRegistros :any[] = [];

  cont: Number = 0;

  fechaInicio: string = null;
  fechaFin: string = null;

  constructor(private miDatePipe: DatePipe,
    private fs: FacturaService) { 
      this.fechaInicio = this.miDatePipe.transform(new Date(), 'yyyy-MM-dd');
      this.fechaFin = this.miDatePipe.transform(new Date(), 'yyyy-MM-dd');

      this.fs.getVentas(this.fechaInicio, this.fechaFin).subscribe(data => {
        this.listRegistros = data;
        this.total();
      });
      
    }

  

  ngOnInit() {
    
  }

  reportePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Reportes',
      author: 'IPCA',
      subject: 'Productos reporte',
    });
    pdf.add(
      pdf.ln(1)
    );
    pdf.add(
       new Txt('Ventas').alignment('center').bold().italics().end
    );

    pdf.add(
      new Columns([ 'Cantidad','Nombre','Precio', 'Codigo de Barras', 'Categoria' ]).columnGap(3).end
    );
    this.listRegistros.forEach( registro => {
      pdf.add(
        new Columns([ registro.cantidad,registro.nombre,registro.precio, registro.codigo_barras, registro.nombre_categoria ]).columnGap(3).end
      );
    });
    pdf.footer(`${ new Date() }`);
    pdf.watermark('IPCA');
    pdf.create().open()
  }


  
  

  ver() {
    const fechaInicio = this.miDatePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    const fechaFin = this.miDatePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.fs.getVentas(fechaInicio, fechaFin).subscribe(data => this.listRegistros = data);
  }

  total() {
    
    for (const prod of this.listRegistros) {
      this.cont += prod.precio;
    }

    console.log(this.cont);
  }


}
