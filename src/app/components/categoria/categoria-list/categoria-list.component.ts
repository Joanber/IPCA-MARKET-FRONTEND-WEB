import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../../../services/categorias.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  constructor( private categoriaSer: CategoriasService ) { }
  categoriaList: Categoria[];
  ngOnInit() {
    this.categoriaSer.getCategorias().subscribe( categoria => {
      this.categoriaList = categoria;
      // console.log(this.categoriaList);

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
