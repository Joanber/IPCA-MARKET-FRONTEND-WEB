import { TipoMovimiento } from './tipoMovimiento';
import { Usuario } from './usuario';
export class Movimiento {
    idMovimiento: string;
    fechaMovimiento: Date;
    ibservacionMovimiento: string;
    idTipoMovimiento: TipoMovimiento;
    idUsuario: Usuario;
}
