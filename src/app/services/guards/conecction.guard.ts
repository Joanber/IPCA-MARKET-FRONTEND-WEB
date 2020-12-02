import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { ConnectionService } from "../connection.service";

@Injectable({
  providedIn: "root",
})
export class ConecctionGuard implements CanActivate {
  constructor(private conSrv: ConnectionService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.conSrv.online) {
      console.log(this.conSrv.online, "valor boolean");
      return true;
    }
    this.conSrv.isNetworkStopped = true;
    this.router.navigate(["/not-conection"]);
    console.log(this.conSrv.online, "valor boolean");
    return false;
  }
}
