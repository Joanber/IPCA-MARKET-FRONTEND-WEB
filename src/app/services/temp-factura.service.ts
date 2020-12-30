import { Injectable } from "@angular/core";
import { Factura } from "../models/factura";

@Injectable({
  providedIn: "root",
})
export class TempFacturaService {
  public factura: Factura;
  constructor() {}

  public get getFactura(): Factura {
    if (this.factura != null) {
      return this.factura;
    } else if (
      this.factura == null &&
      sessionStorage.getItem("factura") != null
    ) {
      this.factura = JSON.parse(sessionStorage.getItem("factura")) as Factura;
      return this.factura;
    }
    return new Factura();
  }

  public guardarFactura(factura: Factura) {
    this.factura = factura;
    sessionStorage.setItem("factura", JSON.stringify(this.factura));
  }
  public borrarFacturas() {
    sessionStorage.removeItem("factura");
    localStorage.removeItem("facturas");
    localStorage.clear();
    sessionStorage.clear();
  }

  public borrarItemsFacturas() {
    this.factura = null;
    sessionStorage.removeItem("factura");
    localStorage.removeItem("facturas");
  }
}
