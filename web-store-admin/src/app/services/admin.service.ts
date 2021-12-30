import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  public urlBackend;

  constructor(private _http: HttpClient,
    private _router: Router) {
    this.urlBackend = GLOBAL.urlBackend;
  }

  loginAdmin(data): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.urlBackend + "login_admin", data, {
      headers: headers,
    });
  }

  getToken() {
    return localStorage.getItem(GLOBAL.token);
  }

  registration(token, data): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.post(this.urlBackend + "registration_admin", data, { headers: headers });
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    try {
      const helper = new JwtHelperService();

      if (this.getToken()) {
        var decodedToken = helper.decodeToken(this.getToken());

        if (!decodedToken) {
          localStorage.removeItem(GLOBAL.token);
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      localStorage.removeItem(GLOBAL.token);
      return false;
    }

    return allowRoles.includes(decodedToken["rol"]);
  }

  validateToken(statusId) { 

    if (statusId == GLOBAL.invalid_token_id) {
      localStorage.removeItem(GLOBAL.token);
      localStorage.removeItem(GLOBAL.id);
      this._router.navigate(["/login"]);
    }

  }
}
