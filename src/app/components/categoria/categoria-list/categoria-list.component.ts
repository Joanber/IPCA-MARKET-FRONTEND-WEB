import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../../../services/categorias.service'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt, Columns, Rect, Canvas} from 'pdfmake-wrapper';
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  constructor( private categoriaSer: CategoriasService ) { }
  categoriaList: Categoria[];
  baseEndpoint = BASE_ENDPOINT + "/categorias";
  paginator:any;
  ngOnInit() {
    this.getCategorias();
  }

  reportePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Categorias',
      author: 'IPCA',
      subject: 'Categorias reporte',
    });
    pdf.header(
       new Txt('Categorias').alignment('center').bold().italics().end
    );
    pdf.add(
      new Columns([ '#','Nombre' ]).columnGap(3).end
    );
    this.categoriaList.forEach( categoria => {
      pdf.add(
        new Columns([ categoria.id,categoria.nombre ]).columnGap(3).end
      );
    });
    pdf.footer(`${ new Date() }`);
    pdf.watermark('IPCA');
    pdf.create().open()
  }


  getCategorias(): void {
    this.categoriaSer.getCategorias().subscribe( categoria => {
      this.categoriaList = categoria;
      console.log(this.categoriaList);
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
              `Persona ${categoria.nombre} eliminada correctamente!`,
              'success'
            )
          }
        )
      }
    })
  }

}
