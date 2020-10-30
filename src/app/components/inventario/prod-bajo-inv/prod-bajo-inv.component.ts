import { Component, OnInit } from "@angular/core";
import { ProductoBajoInventario } from "src/app/models/ProductoBajoInventario";
import { FacturasService } from "src/app/services/facturas.service";
import { Txt, Columns, PdfMakeWrapper, Img } from "pdfmake-wrapper";

@Component({
  selector: "app-prod-bajo-inv",
  templateUrl: "./prod-bajo-inv.component.html",
  styleUrls: ["./prod-bajo-inv.component.css"],
})
export class ProdBajoInvComponent implements OnInit {
  productosBajosInventario: ProductoBajoInventario[] = [];
  dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  fechaAc: string;
  constructor(private srvF: FacturasService) {}

  ngOnInit() {
    this.getProdcutosBajosInventario();
  }
  getProdcutosBajosInventario() {
    this.srvF
      .getProductosBajosEnInventario()
      .subscribe((productosBajoInventario) => {
        this.productosBajosInventario = productosBajoInventario;
        console.log(this.productosBajosInventario);
      });
  }
  imprimirPDF() {
    this.fecha();
    const pdf = new PdfMakeWrapper();
    pdf.pageSize("A4");
    pdf.info({
      title: "Reporte de Productos Bajos en Inventario",
      author: "IPCA",
      subject: "Productos reporte",
    });
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Instituto de Parálisis Cerebral del Azuay-IPCA")
        .alignment("left")
        .bold()
        .italics().end
    );
    pdf.add(new Txt(`${this.fechaAc}`).alignment("right").italics().end);
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt("Reporte de Productos Bajos en Inventario")
        .alignment("center")
        .bold()
        .italics().end
    );
    pdf.add(pdf.ln(1));

    pdf.add(
      new Columns(["Codigo", "Nombre", "Precio", "Cantidad", "Categoria"])
        .columnGap(3)
        .bold().end
    );
    this.productosBajosInventario.forEach((producto) => {
      pdf.add(
        new Columns([
          producto.codigo_barras,
          producto.nombre,
          `$${this.formateaValor(producto.precio)}`,
          producto.cantidad_maxima,
          producto.nombre_categoria,
        ]).columnGap(3).end
      );
    });

    pdf.create().open();
  }
  fecha() {
    let date = new Date();
    var fechaNum = date.getDate();
    var mes_name = date.getMonth();
    this.fechaAc =
      this.dias[date.getDay() - 1] +
      " " +
      fechaNum +
      " de " +
      this.meses[mes_name] +
      " de " +
      date.getFullYear();
  }
  formateaValor(valor) {
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }
}
