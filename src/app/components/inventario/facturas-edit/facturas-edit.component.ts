import { Component, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DetalleFactura } from "src/app/models/detalleFactura";
import { Factura } from "src/app/models/factura";
import { Producto } from "src/app/models/producto";
import { FacturasService } from "src/app/services/facturas.service";
import { ProductoService } from "src/app/services/producto.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-facturas-edit",
  templateUrl: "./facturas-edit.component.html",
  styleUrls: ["./facturas-edit.component.css"],
})
export class FacturasEditComponent implements OnInit {
  public factura = new Factura();
  public autocompleteControl = new FormControl();
  public productoFiltrado: Producto;
  public usuarioVendedor: string = null;
  public total: number;
  public existencia: number;
  public isError = false;
  public existenciapro: number;
  constructor(
    private srvf: FacturasService,
    private router: Router,
    private route: ActivatedRoute,
    private srvP: ProductoService
  ) {}

  ngOnInit() {
    this.cargarfactura();
  }
  public productoEscaneadoDigitado(termino: string, event) {
    if (termino.length > 9) {
      this.srvP.getCodigoBarrasExiste(termino.toUpperCase()).subscribe((p) => {
        if (p == null) {
          console.log("no existe");
        } else {
          this.productoFiltrado = p;
          this.seleccionarProducto(this.productoFiltrado);
          event.target.value = "";
          event.target.focus;
        }
      });
    }
  }
  public seleccionarProducto(producto: Producto): void {
    if (producto.cantidad_maxima == 0) {
      Swal.fire({
        title: ` ! INVENTARIO INSUFICIENTE DE ${producto.nombre}, HAY 0 DISPONIBLES ! `,
        icon: "error",
        showConfirmButton: false,
        onOpen: function () {
          setTimeout(function () {
            Swal.close();
          }, 2800);
        },
      });
      return;
    }
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoDetalle = new DetalleFactura();
      nuevoDetalle.producto = producto;
      this.factura.detalles_facturas.push(nuevoDetalle);
    }
    this.autocompleteControl.setValue("");
  }
  private existeItem(id: number): boolean {
    let existe = false;
    this.factura.detalles_facturas.forEach((delalle: DetalleFactura) => {
      if (id === delalle.producto.id) {
        existe = true;
      }
    });
    return existe;
  }
  private incrementaCantidad(id: number): void {
    this.factura.detalles_facturas = this.factura.detalles_facturas.map(
      (detalle: DetalleFactura) => {
        if (id === detalle.producto.id) {
          if (detalle.cantidad >= detalle.producto.cantidad_maxima) {
            detalle.cantidad = detalle.producto.cantidad_maxima;
          } else {
            ++detalle.cantidad;
          }
        }
        return detalle;
      }
    );
  }
  public eliminarItemFactura(id: number): void {
    this.factura.detalles_facturas = this.factura.detalles_facturas.filter(
      (detalle: DetalleFactura) => id !== detalle.producto.id
    );
  }

  public actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.onIsError();
    }
    this.factura.detalles_facturas = this.factura.detalles_facturas.map(
      (detalle: DetalleFactura) => {
        if (id === detalle.producto.id) {
          if (cantidad > detalle.producto.cantidad_maxima) {
            Swal.fire({
              title: ` ! INVENTARIO INSUFICIENTE DE ${detalle.producto.nombre}, HAY ${detalle.producto.cantidad_maxima} DISPONIBLES ! `,
              icon: "error",
              showConfirmButton: false,
              onOpen: function () {
                setTimeout(function () {
                  Swal.close();
                }, 2800);
              },
            });
            detalle.cantidad = detalle.producto.cantidad_maxima;
          } else {
            detalle.cantidad = cantidad;
          }
        }
        return detalle;
      }
    );
  }

  public async cargarfactura() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      if (id) {
        this.srvf.getFacturaById(id).subscribe((factura) => {
          this.factura = factura;
          this.usuarioVendedor = this.factura.usuario.username;
        });
      }
    });
  }

  public irFacturas() {
    this.router.navigate(["/inventario/facturas"]);
  }
  public calcularGranTotal(): number {
    this.total = 0;
    this.factura.detalles_facturas.forEach((item: DetalleFactura) => {
      this.total += item.cantidad * item.producto.precio;
    });
    return this.total;
  }

  public actualizarFactura(form: NgForm) {
    if (this.factura.detalles_facturas.length > 0) {
      this.factura.detalles_facturas.forEach((item: DetalleFactura) => {
        item.total = item.cantidad * item.producto.precio;
      });
      this.srvf.update(this.factura).subscribe((factura) => {
        this.irFacturas();
        Swal.fire(
          "Actualizar Factura",
          `!Factura N° ${factura.id} actualizada con exito!`,
          "success"
        );
      });
    }
  }
  private onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }
}
