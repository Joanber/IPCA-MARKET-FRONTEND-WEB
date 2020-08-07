import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  constructor( private prodService: ProductoService ) { }
  prodLista: Producto[];
  ngOnInit() {
    this.prodService.getProductos().subscribe(productos => {
      this.prodLista = productos;
    });
  };


  delete(producto: Producto):void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas  seguro?',
      text: `¿Seguro que quieres eliminar ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.prodService.eliminarSinFoto(producto.id).subscribe(
          response => {
            this.prodLista = this.prodLista.filter(prod => prod !== producto)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Persona ${producto.nombre} eliminada correctamente!`,
              'success'
            )
          }
        )
      }
    })
  }
}
