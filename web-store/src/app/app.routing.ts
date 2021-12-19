import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { Route } from "@angular/compiler/src/core";
import { StartComponent } from "./components/start/start.component";

const appRouter: Routes = [
    {path: '', component: StartComponent}
]

export const appRoutingPorviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRouter);