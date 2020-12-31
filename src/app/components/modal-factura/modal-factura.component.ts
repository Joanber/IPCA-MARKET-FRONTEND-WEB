import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Factura } from "src/app/models/factura";
import { FacturasService } from "src/app/services/facturas.service";
import { TempFacturaService } from "src/app/services/temp-factura.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-modal-factura",
  templateUrl: "./modal-factura.component.html",
  styleUrls: ["./modal-factura.component.css"],
})
export class ModalFacturaComponent implements OnInit {
  public factura: Factura = new Factura();
  public pagoCon: number = 0;
  public cambio: number = 0;
  constructor(
    private srvF: FacturasService,
    private router: Router,
    private temFacSer: TempFacturaService
  ) {}

  ngOnInit() {
    if (this.temFacSer.getFactura.total > 0) {
      this.factura = this.temFacSer.getFactura;
    }
  }

  public actualizarPagoCon(event: any, factura: Factura) {
    let cantidad: number = event.target.value as number;
    if (cantidad == factura.calcularGranTotal()) {
      return (this.cambio = 0);
    }
    if (cantidad < 0) {
      return (this.cambio = 0);
    }
    this.pagoCon = factura.calcularGranTotal();
    let cambio = cantidad - factura.calcularGranTotal();
    this.cambio = cambio;
    if (this.cambio < 0) {
      return (this.cambio = 0);
    }
    return this.cambio;
  }

  public irHome() {
    this.router.navigate(["/home"]);
  }
  public guardarVentaFactura() {
    this.srvF.crearFactura(this.factura).subscribe((factura) => {
      Swal.fire({
        title: "!PRODUCTO VENDIDO CON ÉXITO¡",
        icon: "success",
        showConfirmButton: false,
        onOpen: function () {
          setTimeout(function () {
            Swal.close();
          }, 1000);
        },
      });
    });
    this.temFacSer.borrarItemsFacturas();
    this.irHome();
  }
}
