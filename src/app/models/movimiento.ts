import { TipoMovimiento } from './tipoMovimiento';
import { Usuario } from './usuario';
export class Movimiento {
    id: string;
    fecha: Date;
    observacion: string;
    tipoMovimiento: TipoMovimiento;
}
