import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import { Txt, Columns } from "pdfmake-wrapper";
import { FacturasService } from "../../../services/facturas.service";
import { UtilsReportService } from "../../../services/utils-report.service";
import { Usuario } from "../../../models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import * as moment from "moment";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.css"],
  providers: [DatePipe],
})
export class ReportesComponent implements OnInit {
  public listRegistros: any[] = [];
  public optionsFechas: string[] = [
    "Hoy",
    "Anteayer",
    "Esta semana",
    "La semana pasada",
    "Del mes",
    "Periodo Particular",
  ];
  public opcionSeleccionada: string = "Hoy";
  public mostrarFechasPorPeriodo = false;

  public cont: number;
  public totalVentas: number;
  public ganancia: number;
  public totalganancia: number;

  public fechaInicio: string = null;
  public fechaFin: string = null;
  public user: string = undefined;
  usuarios: Usuario[];

  constructor(
    private miDatePipe: DatePipe,
    private srvUr: UtilsReportService,
    private usuarioService: UsuarioService,
    private fs: FacturasService
  ) {
    this.getUsuarios();
    this.fechaInicio = this.formatoFecha(new Date().toDateString());
    this.fechaFin = this.formatoFecha(new Date().toDateString());
    this.obtenerRegistros(this.fechaInicio, this.fechaFin, this.user);
  }

  public async getUsuarios() {
    this.usuarios = await this.usuarioService
      .getUsuarios()
      .toPromise()
      .then((usuarios) => (this.usuarios = usuarios));
  }

  ngOnInit() {}

  public reportePDF() {
    this.switch();
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageSize("A4");
    pdf.info({
      title: "Reporte de Ventas",
      author: "IPCA",
      subject: "Venstas reporte",
    });
    pdf.add(
      new Txt("Instituto de Parálisis Cerebral del Azuay-IPCA")
        .alignment("center")
        .bold()
        .italics().end
    );
    pdf.add(new Txt(`${this.srvUr.fecha()}`).alignment("right").italics().end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt(`Vendedor: ${this.user || "TODOS"}`).alignment("left").end);
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt(`Ventas: ${this.opcionSeleccionada}`).alignment("left").end
    );
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt(
        `Fechas: ${this.formatoFecha(this.fechaInicio)} /  ${this.formatoFecha(
          this.fechaFin
        )}`
      ).alignment("left").end
    );
    pdf.add(
      new Txt(`Total Vendido: $${this.srvUr.formateaValor(this.cont)}`)
        .alignment("right")
        .bold().end
    );
    pdf.add(
      new Txt(`Ganancia: $${this.srvUr.formateaValor(this.ganancia)}`)
        .alignment("right")
        .bold().end
    );
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Reporte de Ventas").alignment("center").bold().italics().end
    );
    pdf.add(pdf.ln(1));

    pdf.add(
      new Columns([
        "Cantidad",
        "Nombre",
        "Precio U.",
        "SubTotal",
        "Codigo de Barras",
        "Categoria",
        "Hora",
      ])
        .columnGap(1)
        .alignment("center")
        .bold().end
    );
    this.listRegistros.forEach((registro) => {
      pdf.add(
        new Columns([
          registro.cantidad,
          registro.nombre,
          `$${this.srvUr.formateaValor(registro.precio)}`,
          `$${this.srvUr.formateaValor(registro.precio * registro.cantidad)}`,
          registro.codigo_barras,
          registro.nombre_categoria,
          this.formatoHora(registro.fecha),
        ])
          .columnGap(1)
          .alignment("center").end
      );
      pdf.add(pdf.ln(1));
    });
    pdf.create().open();
  }

  public ver() {
    this.switch();
    this.obtenerRegistros(this.fechaInicio, this.fechaFin, this.user);
  }

  public obtenerRegistros(inicio: string, fin: string, usuario: string) {
    this.fs.getVentas(inicio, fin, usuario).subscribe(async (data) => {
      this.listRegistros = await data;
      this.total();
      this.totalGanancia();
    });
  }

  public formatoFecha(fecha: string) {
    return this.miDatePipe.transform(
      fecha || new Date().toDateString(),
      "yyyy-MM-dd"
    );
  }

  public formatoHora(hora: string) {
    return this.miDatePipe.transform(hora, "H:mm a");
  }

  public total() {
    this.totalVentas = 0;
    this.cont = 0;
    for (const prod of this.listRegistros) {
      this.totalVentas = prod.precio * prod.cantidad;
      this.cont += this.totalVentas;
    }
  }

  public totalGanancia() {
    this.ganancia = 0;
    this.totalganancia = 0;
    for (const prod of this.listRegistros) {
      this.totalganancia =
        prod.precio * prod.cantidad - prod.precio_compra * prod.cantidad;
      this.ganancia += this.totalganancia;
    }
  }
  private switch() {
    switch (this.opcionSeleccionada) {
      case "Hoy":
        this.fechaInicio = this.formatoFecha(new Date().toDateString());
        this.fechaFin = this.formatoFecha(new Date().toDateString());
        break;
      case "Anteayer":
        this.fechaInicio = moment().subtract(1, "days").format("YYYY-MM-DD");
        this.fechaFin = this.fechaInicio;
        break;
      case "Esta semana":
        this.fechaInicio = moment().subtract(7, "days").format("YYYY-MM-DD");
        this.fechaFin = this.formatoFecha(new Date().toDateString());
        break;
      case "La semana pasada":
        this.fechaInicio = moment().subtract(14, "days").format("YYYY-MM-DD");
        this.fechaFin = moment().subtract(7, "days").format("YYYY-MM-DD");
        break;
      case "Del mes":
        this.fechaInicio = moment().subtract(1, "months").format("YYYY-MM-DD");
        this.fechaFin = this.formatoFecha(new Date().toDateString());
        break;
      case "Periodo Particular":
        this.fechaInicio = this.formatoFecha(this.fechaInicio);
        this.fechaFin = this.formatoFecha(this.fechaFin);
        break;
      default:
    }
  }
  capturarPeriodo() {
    if (this.opcionSeleccionada == "Periodo Particular") {
      this.mostrarFechasPorPeriodo = true;
      this.fechaInicio = null;
      this.fechaFin = null;
    } else {
      this.mostrarFechasPorPeriodo = false;
    }
  }
}
