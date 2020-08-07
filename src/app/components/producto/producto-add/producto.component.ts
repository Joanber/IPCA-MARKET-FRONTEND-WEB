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
    private router: Router,
    private route: ActivatedRoute) { }

  public producto = new Producto;
  lista: Categoria[];
  ngOnInit() {
    this.catService.getCategorias().subscribe( data => {
      this.lista = data;
    });

    this.cargarProducto();

  }
  cargarProducto() {
    this.route.paramMap.subscribe( param => {
      const id:number = +param.get('id');
      if (id) {
        this.titulo = 'Actualizar Producto';
        this.prodService.getProductoById(id).subscribe(producto => this.producto = producto);
      }
    });
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

  editar():void {
    if (!this.fotoSeleccionada) {
      this.prodService.editarSinFoto(this.producto).subscribe( producto =>{
        this.irProductos();
        Swal.fire('Actualizar Producto',`¡${producto.nombre} actualizado con exito!`,'success');
      });
    }
  }

  irProductos() {
    this.router.navigate(['/dashprod/producto']);
  }
}
