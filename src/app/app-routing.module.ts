import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PageErrorComponent } from './page-error/page-error.component';

const routes: Routes = [

  { path:'admin' ,canActivate:[AuthGuard], loadChildren: () => import('./admin/admin.module') .then(m => m.AdminModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'offers', loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule) },
  { path:'home' , component:HomeComponent } ,
  { path:'errorPage' , component:PageErrorComponent } ,
  { path:'' ,    redirectTo:'home' , pathMatch:'full' },
  { path:'**' , redirectTo:'errorPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
