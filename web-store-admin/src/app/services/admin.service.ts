import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  loginAdmin(data): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url + "login_admin", data, {
      headers: headers,
    });
  }

  getToken() {
    return localStorage.getItem(GLOBAL.token);
  }

  registration(token, data): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.post(this.url + "registration_admin", data, { headers: headers });
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
}
