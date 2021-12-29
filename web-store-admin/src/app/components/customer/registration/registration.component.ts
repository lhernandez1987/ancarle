import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { MessageService } from "src/app/services/message.service";
import { CountriesService, Country } from "src/app/services/countries.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  customer: any = {
    gender: "",
    country: "",
  };
  flag: boolean = false;
  dataFlag: boolean;
  token;
  Countries: Country[] = [];
  customerId;
  load = false;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
    private countriesService: CountriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.token = this.adminService.getToken();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {

      this.customerId = params["id"];

      if (this.customerId) {
        this.customerService.getCustomer(this.customerId, this.token).subscribe(
          (response) => {
            this.customer = response.data;
            this.customer.password = "";
          },
          (error) => {
            this.customer = undefined;
          }
        );
      }
    });

    this.Countries = this.countriesService.getCountries();

  }

  regitration() {

    if (this.customer.password != "" && this.customer.password != this.customer.confimPassword) {
      this.flag = true;
      this.load = false;
    } else {

      if (this.customerId) {

        this.load = true;

        this.customerService
          .updateCustomer(this.token, this.customer, this.customerId)
          .subscribe(
            (response) => {

              this.messageService.getMessageSuccess(response.status.name);
              this.router.navigate(["/panel/clientes"]);

            },
            (error) => {}
          );
      } else {

        this.load = false;
        
        this.adminService.registration(this.token, this.customer).subscribe(
          (response) => {
            this.messageService.getMessageSuccess(response.status.name);

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
              birthDate: "",
            };

            this.load = true;
            this.router.navigate(["/panel/clientes"]);

          },
          (e) => {
            
            this.messageService.getMessageError(e.error.status.name);
            this.adminService.validateToken(e.error.status.id);

          }
        );
      }
    }
  }

  restrictNumeric(e) {
    return new RegExp('[0-9]').test(String.fromCharCode(e.which));
  }

  restrictSpecialCharacters(e) {
    return !!/^[^{}*+£$%\\//()@?¡¿!^-_0-9]+$/g.test(String.fromCharCode(e.which));
  }

  validNumbersLetters(e) {
    return !!/^[^{}*+£$%\\//()@?¡¿!^-_]+$/g.test(String.fromCharCode(e.which));
  }

}
