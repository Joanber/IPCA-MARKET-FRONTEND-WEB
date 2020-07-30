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
  private fotoSeleccionada = File;
  titulo:string = 'Crear Producto';
  constructor( private catService: CategoriasService,
    private prodService: ProductoService,
    private router: Router ) { }

  public producto = new Producto;
  listaCategoria: Categoria;
  ngOnInit() {
    this.catService.getCategorias().subscribe(categoria => this.listaCategoria = categoria );
  }
  cargarProdcuto() {

  }

  crear() {
    if (!this.fotoSeleccionada) {
      this.prodService.crearSinFoto(this.producto).subscribe(producto => {
        this.irProductos();
        Swal.fire('Nueva Persona',`${producto.nombre} creado con exito!`,'success');
      })
    }
  }

  irProductos() {
    this.router.navigate(['/dashprod/producto']);
  }
}
