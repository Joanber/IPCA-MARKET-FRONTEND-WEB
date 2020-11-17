import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt, Columns, Rect, Canvas} from 'pdfmake-wrapper';
import { FacturasService } from '../../../services/facturas.service';
import { UtilsReportService } from '../../../services/utils-report.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [DatePipe]
})
export class ReportesComponent implements OnInit {

  listRegistros :any[] = [];

  cont: number;
  totalVentas: number;

  fechaInicio: string = null;
  fechaFin: string = null;
  user: string = undefined;

  usuarios: Usuario[];

  constructor(private miDatePipe: DatePipe,
    private srvUr: UtilsReportService,
    private usuarioService: UsuarioService,
    private fs: FacturasService) {
      this.getUsuarios();
      
      this.fechaInicio = this.formatoFecha(new Date().toDateString());
      this.fechaFin = this.formatoFecha(new Date().toDateString());
      
      this.fs.getVentas(this.fechaInicio, this.fechaFin, this.user).subscribe(data => { 
        this.listRegistros = data;
        console.log(this.listRegistros);
        this.total();
      });
      
    }

  getUsuarios(): void {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  ngOnInit() {
    
  }

  reportePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageSize("A4");
    pdf.info({
      title: "Reporte de Ventas",
      author: "IPCA",
      subject: "Venstas reporte",
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
      new Txt("Reporte de Ventas").alignment("center").bold().italics().end
    );
    pdf.add(pdf.ln(1));

    pdf.add(
      new Columns([
        'Cantidad',
        'Nombre',
        'Precio',
        'Codigo de Barras',
        'Categoria',
        'Hora' 
      ]).columnGap(1).alignment("center").bold().end
    );
    this.listRegistros.forEach( registro => {
      pdf.add(
        new Columns([ 
          registro.cantidad,
          registro.nombre,
          `$${this.srvUr.formateaValor(registro.precio)}`,
          registro.codigo_barras,
          registro.nombre_categoria,
          this.formatoHora(registro.fecha),
        ]).columnGap(1).alignment("center").end
      );
    });
    pdf.create().open()
  }

  ver() {
    const fechaInicio = this.formatoFecha(this.fechaInicio);
    const fechaFin = this.formatoFecha(this.fechaFin);
    this.fs.getVentas(fechaInicio, fechaFin, this.user).subscribe(data => { 
      this.listRegistros = data;
      this.total();
    });
    
  }

  formatoFecha(fecha: string) {
    return this.miDatePipe.transform(fecha, 'yyyy-MM-dd');
  }

  formatoHora(hora: string) {
    return this.miDatePipe.transform(hora, 'H:mm a');
  }

  total() {
    this.totalVentas = 0;
    this.cont = 0;
    for (const prod of this.listRegistros) {
      this.totalVentas = prod.precio * prod.cantidad;
      this.cont += this.totalVentas;
    }
  }


}
