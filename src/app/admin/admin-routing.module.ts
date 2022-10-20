import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageErrorComponent } from "../page-error/page-error.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes :Routes =[
  { path:'dashboard' , component:DashboardComponent },
  { path:'' ,    redirectTo:'dashboard' , pathMatch:'full' },
  { path:'errorPage' , component:PageErrorComponent } ,
  { path:'**' , redirectTo:'errorPage' }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]


})
export class adminRoutingModule {

}
