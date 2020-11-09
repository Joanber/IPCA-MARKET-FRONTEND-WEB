import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../../../services/categorias.service'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt, Columns, Rect, Canvas} from 'pdfmake-wrapper';
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import { MatPaginator, PageEvent } from '@angular/material';
import { UtilsReportService } from '../../../services/utils-report.service';





@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  busqueda = true;

  constructor( private categoriaSer: CategoriasService,
    private srvUr: UtilsReportService
   ) { }
  categoriaList: Categoria[];
  baseEndpoint = BASE_ENDPOINT + "/categorias";
  paginator:any;
  ngOnInit() {
    this.getCategorias();
    this.getCategoriaPage();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getCategoriaPage();
  }

  getCategoriaPage(): void {
    this.categoriaSer
        .getCategoriasPage(this.paginaActual.toString())
        .subscribe((p) => {
          this.categoriaList = p.content as Categoria[];
          this.totalRegistros = p.totalElements as number;
          this.paginador._intl.itemsPerPageLabel = "Registros por página:";
          this.paginador._intl.nextPageLabel = "Siguiente";
          this.paginador._intl.previousPageLabel = "Previa";
          this.paginador._intl.firstPageLabel = "Primera Página";
          this.paginador._intl.lastPageLabel = "Última Página";
        });
  }

  buscarCategoria(termino: string) {
    if (termino.length > 0) {
      this.categoriaSer
        .getCategoriasFiltro(termino.toUpperCase())
        .subscribe((categorias) => (this.categoriaList = categorias));
    } else {
      this.getCategorias();
    }
  }

  reportePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageSize("A4");
    pdf.info({
      title: "Reporte de Categorias",
      author: "IPCA",
      subject: "Categorias reporte",
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
      new Txt("Categorias").alignment("center").bold().italics().end
    );
    pdf.add(pdf.ln(1));
    pdf.add(
      new Columns([ '#','Nombre' ]).columnGap(3).end
    );
    this.categoriaList.forEach( categoria => {
      pdf.add(
        new Columns([ categoria.id,categoria.nombre ]).columnGap(3).end
      );
    });
    pdf.create().open()
  }

  public cargarCategoriaDefault(event: any) {
    let termino: string = event.target.value as string;
    if (termino.length == 0) {
      this.getCategoriaPage();
      this.busqueda = true;
    }
  }


  getCategorias(): void {
    this.categoriaSer.getCategorias().subscribe( categoria => {
      this.categoriaList = categoria;
    });
  }

  delete(categoria: Categoria):void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas  seguro?',
      text: `¿Seguro que quieres eliminar ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.categoriaSer.eliminar(categoria.id).subscribe(
          response => {
            this.categoriaList = this.categoriaList.filter(cate => cate !== categoria)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Categoria ${categoria.nombre} eliminada correctamente!`,
              'success'
            )
          }
        )
      }
    })
  }

}
