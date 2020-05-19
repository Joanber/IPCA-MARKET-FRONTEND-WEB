import { DetalleFactura } from './detalleFactura';

export class Factura {
    id:number;
    descripcion:string;
    fecha:string;
    observacion:string;
    detalles_facturas:Array<DetalleFactura>=[];
    total:number;
    calcularGranTotal():number{
        this.total =0;
        this.detalles_facturas.forEach((item:DetalleFactura)=>{
            this.total += item.calcularImporte();
        })
        return this.total;
    }
}