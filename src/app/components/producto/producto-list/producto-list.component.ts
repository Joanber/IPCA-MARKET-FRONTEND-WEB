import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductoService } from "../../../services/producto.service";
import { Producto } from "src/app/models/producto";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import { MatPaginator, PageEvent } from "@angular/material";
import { Txt, Columns } from "pdfmake-wrapper";
import { UtilsReportService } from "../../../services/utils-report.service";
import { AuthService } from "src/app/services/login_services/auth.service";

@Component({
  selector: "app-producto-list",
  templateUrl: "./producto-list.component.html",
  styleUrls: ["./producto-list.component.css"],
})
export class ProductoListComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  public busqueda = true;
  public baseEndpoint = BASE_ENDPOINT + "/productos";
  public prodLista: Producto[];
  public prodListaImprimir: Producto[] = [];

  constructor(
    private prodService: ProductoService,
    private srvUr: UtilsReportService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}
  
  ngOnInit() {
    this.getProductoPage();
    this.getProductosImprimir();
  }

  public cargarProductoDefault(event: any) {
    let termino: string = event.target.value as string;
    if (termino.length == 0) {
      this.getProductoPage();
      this.busqueda = true;
    }
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getProductoPage();
  }

  public getProductosImprimir(): void {
    this.prodService.getProductos().subscribe((productos) => {
      this.prodListaImprimir = productos;
    });
  }

  public async buscarProducto(termino: string) {
    if (termino.length > 0) {
      this.prodLista = await this.prodService
        .getProductosFiltro(termino.toUpperCase())
        .toPromise()
        .then((productos) => (this.prodLista = productos));
      this.busqueda = false;
    } else {
      this.getProductoPage();
    }
  }

  public getProductoPage(): void {
    this.prodService
      .getProductosPage(this.paginaActual.toString())
      .subscribe((p) => {
        this.prodLista = p.content as Producto[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }
  public reportePDF() {
    this.getProductosImprimir();
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageSize("A4");
    pdf.info({
      title: "Reporte de Productos",
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
    pdf.add(new Txt(`${this.srvUr.fecha()}`).alignment("right").italics().end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt("Productos").alignment("center").bold().italics().end);
    pdf.add(pdf.ln(1));

    pdf.add(
      new Columns([
        "#",
        "Nombre",
        "Categoria",
        "Descripción",
        "Precio",
      ]).columnGap(3).end
    );
    this.prodListaImprimir.forEach((prod) => {
      pdf.add(
        new Columns([
          prod.id,
          prod.nombre,
          prod.categoria.nombre,
          prod.descripcion,
          `$${this.srvUr.formateaValor(prod.precio)}`,
        ]).columnGap(3).end
      );
    });
    pdf.create().open();
  }

  public delete(producto: Producto): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas  seguro?",
        text: `¿Seguro que quieres eliminar ${producto.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.prodService
            .eliminarSinFoto(producto.id)
            .subscribe((response) => {
              this.prodLista = this.prodLista.filter(
                (prod) => prod !== producto
              );
              swalWithBootstrapButtons.fire(
                "Eliminado!",
                `Producto ${producto.nombre} eliminada correctamente!`,
                "success"
              );
            });
        }
      });
  }
}
