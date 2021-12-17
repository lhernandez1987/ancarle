import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { StartComponent } from "./components/start/start.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";
import { GLOBAL } from "./services/GLOBAL";
import { IndexCustomerComponent } from "./components/customer/index/index-customer.component";
import { RegistrationComponent } from "./components/customer/registration/registration.component";

const appRouter: Routes = [
  { path: "", redirectTo: GLOBAL.start, pathMatch: "full" },
  { path: GLOBAL.start, component: StartComponent, canActivate: [AdminGuard] },
  {
    path: GLOBAL.panel,
    children: [
      {
        path: GLOBAL.customers,
        component: IndexCustomerComponent,
        canActivate: [AdminGuard]
      },
      {path: GLOBAL.registration_customer,
        component: RegistrationComponent,
        canActivate: [AdminGuard]
      },
      {path: GLOBAL.edit_customer_id,
        component: RegistrationComponent,
        canActivate: [AdminGuard]
      }
    ],
  },
  { path: GLOBAL.login, component: LoginComponent },
];

export const appRoutingPorviders: any[] = [];
export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(appRouter);
