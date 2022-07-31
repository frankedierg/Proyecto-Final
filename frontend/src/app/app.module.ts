import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { BannerComponent } from './component/banner/banner.component';
import { ContactComponent } from './component/contact/contact.component';
import { LoginComponent } from './component/login/login.component';
import { CarruselComponent } from './component/carrusel/carrusel.component';
import { NormatividadComponent } from './component/normatividad/normatividad.component';
import { NosotrosComponent } from './component/nosotros/nosotros.component';
import { ServiciosComponent } from './component/servicios/servicios.component';
import { HomeComponent } from './component/home/home.component';
import { PresentacionComponent } from './component/presentacion/presentacion.component';
import { IndexAdminComponent } from './component/index-admin/index-admin.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { Page404Component } from './component/page404/page404.component';
import { StaffComponent } from './component/staff/staff.component';
import { VisitantesComponent } from './component/visitantes/visitantes.component';
import { ReservasComponent } from './component/reservas/reservas.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { PanelresidentesComponent } from './component/panelresidentes/panelresidentes.component';
import { SecondarynavbarComponent } from './component/secondarynavbar/secondarynavbar.component';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './interceptors/interceptor';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    ContactComponent,
    CarruselComponent,
    NormatividadComponent,
    NosotrosComponent,
    ServiciosComponent,
    LoginComponent,
    HomeComponent,
    PresentacionComponent,
    IndexAdminComponent,
    UsuariosComponent,
    Page404Component,
    StaffComponent,
    VisitantesComponent,
    ReservasComponent,
    AdminloginComponent,
    PanelresidentesComponent,
    SecondarynavbarComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule //Libreria para hacer peticiones
  ],
  providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: InterceptorService,
  //     multi:true
  //   },
  //   CookieService
],
    bootstrap: [AppComponent]
})
export class AppModule { }
