import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/Servicios/peticion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private peticion:PeticionService) { }
  email:string = "myemail@gmail.com"
  password:string = ""
  datos:any[] = []
  respuestalogin:any


  ngOnInit(): void {

  }

  iniciar(){
    //INICIO PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/login",
      payload:{
        email:this.email,
        password:this.password
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      this.respuestalogin = res
      if (this.respuestalogin.state == true) {
         window.location.assign('http://localhost:4200/panelresidentes')
               
     }
     else{
      window.location.assign('http://localhost:4200/login')
     }
    })
    //FIN PETICIÓN


    // this.datos.push(this.email)
    // localStorage.setItem('datos',JSON.stringify(this.datos))
  }

  Eliminar(posicion:number){
    console.log(posicion)
    this.datos.splice(posicion,1)
    localStorage.setItem('datos',JSON.stringify(this.datos))

  }

}
