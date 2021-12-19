import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getCustomers(token): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.get(this.url + "get_customers", { headers: headers });
  }

  getCustomer(id, token): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.get(this.url + "/get_customer/"+ id, { headers: headers });
  }

  updateCustomer(token, data, id): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.put(this.url + "/update_customer/"+id, data, { headers: headers });
  }

  deleteCustomer(token, id): Observable<any> {
    let headers = new HttpHeaders({"Content-Type":"application/json","Authorization":token});
    return this._http.delete(this.url + "/delete_customer/"+id, { headers: headers });
  }
}
