import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  urlBackend;

  constructor(private _http: HttpClient) {
    this.urlBackend = GLOBAL.urlBackend;
  }

  getCustomers(token): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.get(this.urlBackend + "get_customers", { headers: headers });
  }

  getCustomer(id, token): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.get(this.urlBackend + "/get_customer/"+ id, { headers: headers });
  }

  updateCustomer(token, data, id): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.put(this.urlBackend + "/update_customer/"+id, data, { headers: headers });
  }

  deleteCustomer(token, id): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.delete(this.urlBackend + "/delete_customer/"+id, { headers: headers });
  }
}
