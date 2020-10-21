import { Component, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { DetalleFactura } from "src/app/models/detalleFactura";
import { Factura } from "src/app/models/factura";
import { Producto } from "src/app/models/producto";
import { FacturasService } from "src/app/services/facturas.service";
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
  productosFiltrados: Observable<Producto[]>;
  public facturaModal: Factura;

  constructor(
    private srvF: FacturasService,
    private srMF: FacturaModalService
  ) {}

  ngOnInit() {
    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === "string" ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value) : []))
    );
  }
  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value;
    return this.srvF.getproductoByCodigoBarras(filterValue.toUpperCase());
  }
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
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
    event.option.focus();
    event.option.deselect();
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
          ++detalle.cantidad;
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
          let cantidadNueva: number = 1;
          detalle.cantidad = cantidadNueva;
          console.log(detalle);
          return detalle;
        }

        if (id === detalle.producto.id) {
          detalle.cantidad = cantidad;
        }
        console.log(detalle.cantidad);
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
}
