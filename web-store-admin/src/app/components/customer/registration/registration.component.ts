import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { MessageService } from "src/app/services/message.service";
import { CountriesService, Country} from "src/app/services/countries.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";


declare var iziToast;

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {

  customer: any = {
    gender: "",
    country: ""
  };
  flag: boolean = false;
  dataFlag: boolean;
  token;
  Countries: Country[] = [];
  customerId;
  load = false;

  constructor(
    private _messageService: MessageService,
    private _adminService: AdminService,
    private _countriesService: CountriesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _customerService: CustomerService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(
      params => {

        this.customerId = params['id'];

        if (this.customerId) {

          this._customerService.getCustomer(this.customerId, this.token).subscribe(
            response => {
  
              this.customer = response.data;
  
              this.customer.password = '';
  
            },
            error => {
              this.customer = undefined;
            }
            
          );

        } 

      }
    )

    this.Countries = this._countriesService.getCountries();
  }

  regitration() {

    console.log(this.customer.country);
    
    if (this.customer.password != "" && this.customer.password != this.customer.confimPassword) {
      this.flag = true;
    } else {
      console.log(this.customer);

      if (this.customerId) {

        this.load = true;
     
        this._customerService.updateCustomer(this.token, this.customer, this.customerId).subscribe(
          response => {

            console.log(response);

            this._messageService.getMessageSuccess(response.status.name);

            this.load = false;

            this._router.navigate(['/panel/clientes']);
          },
          error => {

          }
        )
      } else {
     
        this.load = true;

        this._adminService.registration(this.token, this.customer).subscribe(
          (response) => {
  
            this._messageService.getMessageSuccess(response.status.name);
  
            this.customer = {
              identification: "",
              name: "",
              lastName: "",
              country: "",
              email: "",
              password: "",
              profile: "",
              phone: "",
              gender: "",
              birthDate: ""
            }
          
            setTimeout(() => {
              this.load = false;
            }, 3000)
  
            this._router.navigate(['/panel/clientes']);
  
          },
          (e) => {
            this._messageService.getMessageError(e.error.status.name);
          }
        );
      }
    }
  }

  restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }

}
