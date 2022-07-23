import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private peticion:PeticionService, private msg:MensajesService, private router:Router) { }
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
      if(res.state == true){
        this.msg.Agregarmensaje('success', res.mensaje,10000)
        setTimeout(()=>{
          
        },5000)
        this.router.navigate(['index-admin'])
      }
      else{
        this.msg.Agregarmensaje('danger', res.mensaje,5000)
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
