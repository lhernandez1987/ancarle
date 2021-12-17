import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { GLOBAL } from "../../services/GLOBAL";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public userLogin: any = {};
  public token: any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _util: MessageService
  ) {

    this.token = this._adminService.getToken();

    $('body').attr('style','background: #2a2d2d!important');

  }

  ngOnInit() {

    if (this.token) {
      this._router.navigate(['/']);
    }

  }

  login(loginForm) {

    if (loginForm.valid) {

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.loginAdmin(data).subscribe(
        response => {

          if (response.data == undefined) {

            this._util.getMessageError(response.status.name);

          } else {

            this.userLogin = response.data;

            localStorage.setItem(GLOBAL.token, response.token);
            localStorage.setItem(GLOBAL.id, response.data._id);

            this._router.navigate(['/']);

          }

        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
