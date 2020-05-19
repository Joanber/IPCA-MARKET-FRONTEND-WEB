import { Categoria } from './categoria';
export class Producto {
   id:number;
   nombre:string;
   precio:number;
   cantidad_minima:number;
   cantidad_maxima:number;
   fotoHashCode:number;
   descripcion:string;
   codigo_barras:string;
   categoria:Categoria
}
