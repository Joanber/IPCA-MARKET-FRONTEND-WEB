import { Producto } from './producto';


export class DetalleFactura {
    id:number;
    cantidad:number;
    producto:Producto;
    total:number;

    public calcularImporte():number{
        return this.cantidad * this.producto.precio
    }

}
