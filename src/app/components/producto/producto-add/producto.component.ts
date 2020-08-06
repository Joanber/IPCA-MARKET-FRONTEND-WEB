import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Categoria } from 'src/app/models/categoria';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriasService } from 'src/app/services/categorias.service';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  private fotoSeleccionada: File;
  titulo:string = 'Crear Producto';
  constructor( private catService: CategoriasService,
    private prodService: ProductoService,
    private router: Router ) { }

  public producto = new Producto;
  lista: Categoria;
  ngOnInit() {
    this.catService.getCategorias().subscribe( data => {
      this.lista = data;

    });

  }
  cargarProdcuto() {

  }

  crear() {
    this.producto.fotoHashCode = null;
    this.producto.codigo_barras = "123456789";
    if (!this.fotoSeleccionada) {
      console.log('Entre!!');

      this.prodService.crearSinFoto(this.producto).subscribe(producto => {
        this.irProductos();
        Swal.fire('Nuevo Producto',`${producto.nombre} creado con exito!`,'success');
      })
    } else {
      console.log('Aki else');

    }
  }

  irProductos() {
    this.router.navigate(['/dashprod/producto']);
  }
}
