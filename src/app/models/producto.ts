import { Categoria } from "./categoria";
export class Producto {
  id: number;
  nombre: string;
  precio: number;
  precio_compra;
  cantidad_minima: number;
  cantidad_maxima: number;
  fotoHashCode: number;
  descripcion: string;
  codigo_barras: string;
  categoria: Categoria;
}
