import { Component, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { DetalleFactura } from "src/app/models/detalleFactura";
import { Factura } from "src/app/models/factura";
import { Producto } from "src/app/models/producto";
import { ProductoBajoInventario } from "src/app/models/ProductoBajoInventario";
import { FacturasService } from "src/app/services/facturas.service";
import { ProductoService } from "src/app/services/producto.service";
import Swal from "sweetalert2";

import { FacturaModalService } from "../modal-factura/factura-modal.service";

@Component({
  selector: "app-facturas-ventas",
  templateUrl: "./facturas-ventas.component.html",
  styleUrls: ["./facturas-ventas.component.css"],
})
export class FacturasVentasComponent implements OnInit {
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  productoFiltrado: Producto;
  public facturaModal: Factura;
  productosBajosInventario: ProductoBajoInventario[] = [];
  public proBajos: boolean = false;
  public mensaje: string;

  constructor(
    private srvP: ProductoService,
    private srvF: FacturasService,
    private srMF: FacturaModalService
  ) {}

  ngOnInit() {
    this.getProductosBajosInventario();
  }

  productoEscaneadoDigitado(termino: string, event) {
    if (termino.length > 9) {
      this.srvP.getCodigoBarrasExiste(termino.toUpperCase()).subscribe((p) => {
        if (p == null) {
          console.log("no exitse");
        } else {
          this.productoFiltrado = p;
          console.log(this.productoFiltrado);
          this.seleccionarProducto(this.productoFiltrado);
          event.target.value = "";
          event.target.focus;
        }
      });
    }
  }
  seleccionarProducto(producto: Producto): void {
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

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.detalles_facturas.forEach((delalle: DetalleFactura) => {
      if (id === delalle.producto.id) {
        existe = true;
      }
    });
    return existe;
  }
  incrementaCantidad(id: number): void {
    this.factura.detalles_facturas = this.factura.detalles_facturas.map(
      (detalle: DetalleFactura) => {
        if (id === detalle.producto.id) {
          if (detalle.cantidad >= detalle.producto.cantidad_maxima) {
            detalle.cantidad = detalle.producto.cantidad_maxima;
            console.log(detalle.cantidad, "1");
          } else {
            ++detalle.cantidad;
            console.log(detalle.cantidad, "2");
          }
        }
        return detalle;
      }
    );
  }
  eliminarItemFactura(id: number): void {
    this.factura.detalles_facturas = this.factura.detalles_facturas.filter(
      (detalle: DetalleFactura) => id !== detalle.producto.id
    );
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.factura.detalles_facturas = this.factura.detalles_facturas.map(
      (detalle: DetalleFactura) => {
        if (id === detalle.producto.id) {
          if (cantidad > detalle.producto.cantidad_maxima) {
            console.log(cantidad, "cantidad digitada");
            console.log(
              detalle.producto.cantidad_maxima,
              "cantidadmaxima del producto"
            );
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
            console.log(detalle.cantidad, "paso por aki 1");
            console.log(detalle.producto.cantidad_maxima, "detalle producto");
          } else {
            detalle.cantidad = cantidad;
            console.log(cantidad, "paso por aki 2");
            console.log(detalle.producto.cantidad_maxima, "detalle producto");
          }
        }

        console.log(detalle.cantidad, "detalle cantidad");
        console.log(detalle.producto.cantidad_maxima, "detalle producto");
        console.log("detalles finales");
        console.log(detalle);
        return detalle;
      }
    );
  }

  public abrirModal(factura: Factura, form: NgForm) {
    if (this.factura.detalles_facturas.length > 0) {
      this.facturaModal = factura;
      this.srMF.abrirModal();
    }
  }
  getProductosBajosInventario() {
    this.srvF
      .getProductosBajosEnInventario()
      .subscribe((productosBajoInventario) => {
        this.productosBajosInventario = productosBajoInventario;
        if (this.productosBajosInventario.length > 0) {
          this.proBajos = true;
        } else {
          this.proBajos = false;
        }
      });
  }
  onIsError(): void {
    this.proBajos = true;
    setTimeout(() => {
      this.proBajos = false;
    }, 3000);
  }
}
