import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { CustomerService } from "src/app/services/customer.service";
import { MessageService } from "src/app/services/message.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-index-customer",
  templateUrl: "./index-customer.component.html",
  styleUrls: ["./index-customer.component.css"],
})
export class IndexCustomerComponent implements OnInit {
  customers: Array<any> = [];
  search = "";
  page = 3;
  pageSize = 3;
  token;
  load = true;

  constructor(private _customerService: CustomerService,
    private _adminService: AdminService,
    private router: Router,
    private _messageService: MessageService) {
      this.token = this._adminService.getToken();
    }

  ngOnInit() {
   this.getCustomer();
  }

  getCustomer() {

    this._customerService.getCustomers(this.token).subscribe(
      (response) => {
        
        this.customers = response.data;

        this.load = false;

      },
      (e) => {
        this._messageService.getMessageError(e.error.status.name);
            
        this._adminService.validateToken(e.error.status.id);
      }
    );

  }

  updateCustomer(id) {

    this.router.navigate(['/panel/clientes/edit', id]);

  }

  deleteCustomer(id) {
    
    this._customerService.deleteCustomer(this.token, id).subscribe(
      response => {

        this._messageService.getMessageSuccess(response.status.name);

        $('#delete'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.getCustomer();

      },
      error => {

      }
    )
  }
}
