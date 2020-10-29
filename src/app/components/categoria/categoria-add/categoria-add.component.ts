import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import Swal from 'sweetalert2';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";



@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  private fotoSeleccionada: File;
  public imageSrc;
  baseEndpoint = BASE_ENDPOINT + "/categorias";

  constructor( private categoriaS: CategoriasService,
    private router: Router,
    private route: ActivatedRoute) { }
  titulo:string = 'Crear Categoría';
  categoria= new Categoria;
  ngOnInit() {
    this.cargarCategoria();
  }
  
  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf("image") < 0) {
      this.fotoSeleccionada = null;
      Swal.fire(
        "Error al seleccionar la foto:",
        "El archivo debe ser del tipo imagen",
        "error"
      );
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
      console.log(this.categoria);
    }
  }

  crear(): void {
    if (!this.fotoSeleccionada) {
      this.categoriaS.crearCategoria(this.categoria).subscribe( categoria => {
        this.irCategorias();
        Swal.fire('Nueva Categoría',`${this.categoria.nombre} creada con exito!`,'success');
      });
    }else {
      this.categoriaS
        .crearConFoto(this.categoria, this.fotoSeleccionada)
        .subscribe((categoria) => {
          console.log(categoria);
          this.irCategorias();
          Swal.fire(
            "Nuevo Producto",
            `¡${this.categoria.nombre} creado con exito!`,
            "success"
          );
          
        });
    }

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
    if (!this.fotoSeleccionada) {

      this.categoriaS.editarCategoria(this.categoria).subscribe( categoria =>{
        this.irCategorias();
        Swal.fire('Actualizar Categoría',`¡${categoria.nombre} actualizado con exito!`,'success');
      });
    }else if (!this.fotoSeleccionada && this.categoria.fotoHashCode != null) {
      const hashcode: number = this.categoria.fotoHashCode;
      this.categoria.fotoHashCode = hashcode;
      this.categoriaS
        .editarConFoto(this.categoria, this.fotoSeleccionada)
        .subscribe((categoria) => {
          console.log("producto con foto", categoria);
          Swal.fire(
            "Actualizar Producto",
            `¡${this.categoria.nombre} actualizado con exito!`,
            "success"
          );
          this.irCategorias();
        });
    } else {
      this.categoriaS
        .editarConFoto(this.categoria, this.fotoSeleccionada)
        .subscribe((categoria) => {
          console.log("producto con foto", categoria);
          Swal.fire(
            "Actualizar Producto",
            `¡${this.categoria.nombre} actualizado con exito!`,
            "success"
          );
          this.irCategorias();
        });
    }
  }

  irCategorias() {
    this.router.navigate(['/dashprod/categoria']);
  }
}
