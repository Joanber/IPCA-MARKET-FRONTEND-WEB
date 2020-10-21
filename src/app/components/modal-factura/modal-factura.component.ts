import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Factura } from "src/app/models/factura";
import { FacturasService } from "src/app/services/facturas.service";
import Swal from "sweetalert2";
import { FacturaModalService } from "./factura-modal.service";

@Component({
  selector: "app-modal-factura",
  templateUrl: "./modal-factura.component.html",
  styleUrls: ["./modal-factura.component.css"],
})
export class ModalFacturaComponent implements OnInit {
  @Input() factura: Factura;
  public pagoCon: number = 0;
  public cambio: number = 0;
  constructor(
    public srvMF: FacturaModalService,
    private srvF: FacturasService,
    private router: Router
  ) {}

  ngOnInit() {}

  public actualizarPagoCon(event: any, factura: Factura) {
    let cantidad: number = event.target.value as number;
    if (cantidad == factura.calcularGranTotal()) {
      return (this.cambio = 0);
    }
    if (cantidad < 0) {
      return (this.cambio = 0);
      console.log(cantidad);
    }
    this.pagoCon = factura.calcularGranTotal();
    let cambio = cantidad - factura.calcularGranTotal();
    this.cambio = cambio;
    if (this.cambio < 0) {
      return (this.cambio = 0);
    }
    return this.cambio;
  }

  public cerrarModal() {
    this.srvMF.cerrarModal();
    this.cambio = 0;
    this.pagoCon = 0;
  }

  public guardarVentaFactura() {
    this.srvF.crearFactura(this.factura).subscribe((factura) => {
      console.log(this.factura);
      this.cerrarModal();
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
      this.router
        .navigateByUrl("/home", { skipLocationChange: true })
        .then(() => this.router.navigate(["/home/ventas"]));
    });
  }
}
