import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/Servicios/peticion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private peticion:PeticionService) { }

  ngOnInit(): void {
    this.status()
  }

  ocultar:string = ""

  status(){

    var post = {
      host:this.peticion.urlLocal,
      path:"/status",
      payload:{
      }
    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res.perfil.perfil)
      this.ocultar = res.perfil.perfil
    })

  }

}
