import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { TempFacturaService } from "../temp-factura.service";

@Injectable({
  providedIn: "root",
})
export class CobrarGuard implements CanActivate {
  constructor(
    private temFacturaSrv: TempFacturaService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.temFacturaSrv.getFactura.total > 0) {
      return true;
    }
    this.router.navigate(["/home"]);
    return false;
  }
}
