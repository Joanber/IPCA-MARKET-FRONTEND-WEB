import { Producto } from './producto';
import { Movimiento } from './movimiento';
export class DetalleMovimiento {
    id: number;
    cantidad:number;
    producto: Producto;
}
