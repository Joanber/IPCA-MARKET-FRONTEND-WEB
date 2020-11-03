import { Component, OnInit } from "@angular/core";
import { Producto } from "src/app/models/producto";
import { Categoria } from "src/app/models/categoria";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { ProductoService } from "src/app/services/producto.service";
import { CategoriasService } from "src/app/services/categorias.service";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.css"],
})
export class ProductoComponent implements OnInit {
  private fotoSeleccionada: File;
  public imageSrc;
  baseEndpoint = BASE_ENDPOINT + "/productos";
  titulo: string = "Crear Producto";
  public mensaje: string;
  public existe: boolean = false;
  public existeCodigo: boolean = false;
  constructor(
    private catService: CategoriasService,
    private prodService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public producto = new Producto();
  lista: Categoria[];
  ngOnInit() {
    this.catService.getCategorias().subscribe((data) => {
      this.lista = data;
    });

    this.cargarProducto();
  }

  existeCodigoProducto(codigo: string): void {
    console.log(codigo.length);
    if (codigo.length == 10) {
      this.prodService.getCodigoBarrasExiste(codigo).subscribe((producto) => {
        if (producto != null) {
          this.mensaje = "!Codigo de barras ya existente¡";
          return (this.existe = true);
        } else {
          return (this.existe = false);
        }
      });
    } else {
      this.existe = false;
    }
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
      console.log(this.producto);
    }
  }

  compararProducto(o1: Producto, o2: Producto): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  cargarProducto() {
    this.route.paramMap.subscribe((param) => {
      const id: number = +param.get("id");
      if (id) {
        this.titulo = "Actualizar Producto";
        this.prodService
          .getProductoById(id)
          .subscribe((producto) => (this.producto = producto));
      }
    });
  }

  crear() {
    if (!this.fotoSeleccionada) {
      this.prodService.crearSinFoto(this.producto).subscribe((producto) => {
        this.irProductos();
        Swal.fire(
          "Nuevo Producto",
          `${producto.nombre} creado con exito!`,
          "success"
        );
      });
    } else {
      this.prodService
        .crearConFoto(this.producto, this.fotoSeleccionada)
        .subscribe((producto) => {
          console.log(producto);
          Swal.fire(
            "Nuevo Producto",
            `¡${producto.nombre} creado con exito!`,
            "success"
          );
          this.irProductos();
        });
    }
  }

  editar(): void {
    if (!this.fotoSeleccionada) {
      this.prodService.editarSinFoto(this.producto).subscribe((producto) => {
        this.irProductos();
        Swal.fire(
          "Actualizar Producto",
          `¡${producto.nombre} actualizado con exito!`,
          "success"
        );
      });
    } else if (!this.fotoSeleccionada && this.producto.fotoHashCode != null) {
      const hashcode: number = this.producto.fotoHashCode;
      this.producto.fotoHashCode = hashcode;
      this.prodService
        .editarConFoto(this.producto, this.fotoSeleccionada)
        .subscribe((producto) => {
          console.log("producto con foto", producto);
          Swal.fire(
            "Actualizar Producto",
            `¡${producto.nombre} actualizado con exito!`,
            "success"
          );
          this.irProductos();
        });
    } else {
      this.prodService
        .editarConFoto(this.producto, this.fotoSeleccionada)
        .subscribe((producto) => {
          console.log("producto con foto", producto);
          Swal.fire(
            "Actualizar Producto",
            `¡${producto.nombre} actualizado con exito!`,
            "success"
          );
          this.irProductos();
        });
    }
  }

  irProductos() {
    this.router.navigate(["/dashprod/producto"]);
  }
}
