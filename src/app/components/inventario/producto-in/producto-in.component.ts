import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BASE_ENDPOINT } from "src/app/DB_CONFIG/bdConig";
import { Producto } from "src/app/models/producto";
import { ProductoService } from "src/app/services/producto.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-producto-in",
  templateUrl: "./producto-in.component.html",
  styleUrls: ["./producto-in.component.css"],
})
export class ProductoInComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + "/productos";
  public nombre_producto: string = "Nombre del Producto";
  cantidad_producto: number = 0;
  public producto = new Producto();
  codBarras: string = "";
  codIncorrecto: boolean = false;
  constructor(private srvP: ProductoService) {}

  ngOnInit() {}

  public obtenerProducto(codigo: string) {
    if (codigo.length > 0) {
      this.srvP.getproductoByCodigoBarras(codigo).subscribe((producto) => {
        this.producto = producto;
        this.nombre_producto = this.producto.nombre;
        this.cantidad_producto = this.producto.cantidad_maxima;
        this.producto.cantidad_maxima = 0;
        this.codBarras = this.producto.codigo_barras;
        console.log(this.producto);
      });
    }
  }

  public guardar(form: NgForm) {
    if (form.valid) {
      if (this.codBarras == this.producto.codigo_barras) {
        this.srvP.editarCantidad(this.producto).subscribe((producto) => {
          Swal.fire(
            "Inventario Producto",
            `Se agregó mas cantidad del producto  de ${producto.nombre} !`,
            "success"
          );
          this.formReset(form);
        });
      } else {
        this.onIsError();
      }
    }
  }
  formReset(form: NgForm) {
    form.reset();
    this.producto = new Producto();
    this.cantidad_producto = 0;
    this.nombre_producto = "Nombre del Producto";
    this.codBarras = "";
  }
  resetearForm(termino: string) {
    if (termino.length < 1) {
      this.producto = new Producto();
      this.cantidad_producto = 0;
      this.nombre_producto = "Nombre del Producto";
      this.codBarras = "";
    }
  }
  onIsError(): void {
    this.codIncorrecto = true;
    setTimeout(() => {
      this.codIncorrecto = false;
    }, 1000);
  }
}
