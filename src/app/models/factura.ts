import { DetalleFactura } from "./detalleFactura";
import { Usuario } from "./usuario";

export class Factura {
  id: number;
  fecha: string;
  observacion: string;
  detalles_facturas: Array<DetalleFactura> = [];
  total: number;
  usuario: Usuario;
  calcularGranTotal(): number {
    this.total = 0;
    this.detalles_facturas.forEach((item: DetalleFactura) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
