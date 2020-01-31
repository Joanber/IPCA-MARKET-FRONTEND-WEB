import { Producto } from './producto';
export class Categoria {
    idCategoria: string;
    // tslint:disable-next-line: variable-name
    nombre_categoria: string;
    descripcion_categoria: string;
    productos: Producto[];
}
