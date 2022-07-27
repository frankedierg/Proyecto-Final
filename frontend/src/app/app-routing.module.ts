import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { PresentacionComponent } from './component/presentacion/presentacion.component';
import {IndexAdminComponent} from './component/index-admin/index-admin.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { Page404Component } from './component/page404/page404.component';
import { StaffComponent } from './component/staff/staff.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"presentacion",component:PresentacionComponent},
  {path:"usuarios",component:UsuariosComponent},
  {path: "index-admin",component:IndexAdminComponent},
  {path:"staff",component:StaffComponent},
  {path:"**",component:Page404Component,pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
