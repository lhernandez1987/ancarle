import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AdminService } from "../services/admin.service";
import { Router } from "@angular/router";
import { GLOBAL } from "../services/GLOBAL";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private _adminService: AdminService, private _router: Router) {}

  canActivate(): any {
    if (!this._adminService.isAuthenticated([GLOBAL.rolAdmin])) {
      this._router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
