import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import Swal from 'sweetalert2';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  constructor( private categoriaS: CategoriasService,
    private router: Router,
    private route: ActivatedRoute) { }
  titulo:string = 'Crear Categoría';
  categoria= new Categoria;
  ngOnInit() {
    this.cargarCategoria();
  }


  crear(): void {
    this.categoriaS.crearCategoria(this.categoria).subscribe( categoria => {
      this.irCategorias();
      Swal.fire('Nueva Categoría',`${this.categoria.nombre} creada con exito!`,'success');
    });

  }
  cargarCategoria(): void {
    this.route.paramMap.subscribe( param => {
      const id:number = +param.get('id');
      if (id) {
        this.titulo = 'Actualizar Categoría';
        this.categoriaS.getCategoria(id).subscribe(categoria => this.categoria = categoria);
      }
    });
  }

  editar(): void {
    this.categoriaS.editarCategoria(this.categoria).subscribe( categoria =>{
      this.irCategorias();
      Swal.fire('Actualizar Categoría',`¡${categoria.nombre} actualizado con exito!`,'success');
    });
  }

  irCategorias() {
    this.router.navigate(['/dashprod/categoria']);
  }
}
