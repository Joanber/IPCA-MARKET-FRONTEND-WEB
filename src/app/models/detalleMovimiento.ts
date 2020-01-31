import { Producto } from './producto';
import { Movimiento } from './movimiento';
export class DetalleMovimiento {
    idDetalleMovimiento: string;
    cantidadDetalleMovimiento: number;
    idMovimiento: Movimiento;
    idProducto: Producto;
}
