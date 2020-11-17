import { Factura } from "./factura";
import { Persona } from "./persona";
import { Rol } from "./rol";
export class Usuario {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  activo: boolean;
  persona: Persona;
  roles: Rol[] = [];
  check: boolean = false;
  passactual: string;
  facturas: Array<Factura> = [];
}
