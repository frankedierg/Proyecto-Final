import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { PresentacionComponent } from './component/presentacion/presentacion.component';
import {IndexAdminComponent} from './component/index-admin/index-admin.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { Page404Component } from './component/page404/page404.component';
import { StaffComponent } from './component/staff/staff.component';
import { VisitantesComponent } from './component/visitantes/visitantes.component';
import { ReservasComponent } from './component/reservas/reservas.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { PanelresidentesComponent } from './component/panelresidentes/panelresidentes.component';
import { SecondarynavbarComponent } from './component/secondarynavbar/secondarynavbar.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { SubirarchivosComponent } from './component/subirarchivos/subirarchivos.component';
import { CuotasAdmonComponent } from './component/cuotas-admon/cuotas-admon.component';
import { ParqueaderosComponent } from './component/parqueaderos/parqueaderos.component';
import { VigilanciaComponent } from './component/vigilancia/vigilancia.component';




const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"adminlogin",component:AdminloginComponent},
  {path:"home",component:HomeComponent},
  {path:"presentacion",component:PresentacionComponent},
  {path:"usuarios",component:UsuariosComponent},
  {path:"index-admin",component:IndexAdminComponent},
  {path:"staff",component:StaffComponent},
  {path:"visitantes",component:VisitantesComponent},
  {path:"reservas",component:ReservasComponent},
  {path:"panelresidentes",component:PanelresidentesComponent},
  {path:"secondarynavbar",component:SecondarynavbarComponent},
  {path:"subirarchivos",component:SubirarchivosComponent},
  {path:"cuotas-admon",component:CuotasAdmonComponent},
  {path:"parqueaderos",component:ParqueaderosComponent},
  {path:"vigilancia",component:VigilanciaComponent},
  {path:"**",component:Page404Component,pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
