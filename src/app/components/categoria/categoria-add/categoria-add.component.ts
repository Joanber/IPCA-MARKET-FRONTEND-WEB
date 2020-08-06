import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import Swal from 'sweetalert2';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  constructor( private categoriaS: CategoriasService,
    private router: Router) { }
  titulo:string = 'Crear Categoría';
  categoria= new Categoria;
  ngOnInit() {
  }


  crear(): void {
    this.categoriaS.crearCategoria(this.categoria).subscribe( categoria => {
      this.irCategorias();
      Swal.fire('Nueva Categoría',`${this.categoria.nombre} creada con exito!`,'success');
    });

  }

  irCategorias() {
    this.router.navigate(['/dashprod/categoria']);
  }
}
