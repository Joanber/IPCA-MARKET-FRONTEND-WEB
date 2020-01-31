import { Producto } from './producto';
import { EncabezadoFactura } from './encabezadoFactura';

export class DeatlleFactura {
    idDetalleFactura: string;
    cantidadDetalleactura: number;
    subtotalDetalleFactura: number;
    totalDetalleFactura: number;
    idProducto: Producto;
    idEncabezadoProducto: EncabezadoFactura;
}
