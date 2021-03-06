import { Component, OnInit } from "@angular/core";
import { ProductoBajoInventario } from "src/app/models/ProductoBajoInventario";
import { FacturasService } from "src/app/services/facturas.service";
import { Txt, Columns, PdfMakeWrapper, Img } from "pdfmake-wrapper";
import { UtilsReportService } from "src/app/services/utils-report.service";
import { AuthService } from "src/app/services/login_services/auth.service";

@Component({
  selector: "app-prod-bajo-inv",
  templateUrl: "./prod-bajo-inv.component.html",
  styleUrls: ["./prod-bajo-inv.component.css"],
})
export class ProdBajoInvComponent implements OnInit {
  public productosBajosInventario: ProductoBajoInventario[] = [];
  constructor(
    private srvF: FacturasService,
    private srvUR: UtilsReportService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    this.productosBajosInventario = await this.srvF
      .getProductosBajosEnInventario()
      .toPromise()
      .then((prodbajosInv) => (this.productosBajosInventario = prodbajosInv));
  }

  public imprimirPDF() {
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
    pdf.add(new Txt(`${this.srvUR.fecha()}`).alignment("right").italics().end);
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

  private formateaValor(valor) {
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }
}
