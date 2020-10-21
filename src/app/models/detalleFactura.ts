import { Producto } from "./producto";

export class DetalleFactura {
  cantidad: number = 1;
  producto: Producto;
  total: number;

  public calcularImporte(): number {
    return (this.total = this.cantidad * this.producto.precio);
  }
  public calcularExistencia(): number {
    return this.producto.cantidad_maxima - this.cantidad;
  }
}
