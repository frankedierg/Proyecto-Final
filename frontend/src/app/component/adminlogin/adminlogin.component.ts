import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';
declare var swal:any

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private peticion:PeticionService,private msg:MensajesService,private router:Router) { }
  email:string = "myemail@gmail.com"
  password:string = ""
  datos:any[] = []
  respuestalogin:any


  ngOnInit(): void {

  }

  iniciar(){
    localStorage.setItem('inicio','1')
    //INICIO PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/adminlogin",
      payload:{
        email:this.email,
        password:this.password
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      this.respuestalogin = res
      if (this.respuestalogin.state == true) {
        swal("Se ha logueado correctamente!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,10000)
        setTimeout(() => {
          this.router.navigate(['/index-admin'])
        },2000);
        
       
               
     }
     else{
      swal("Credenciales Inválidas!", "Haz click para cerrar!", "error");
      this.msg.Agregarmensaje('danger',res.mensaje,5000)
      
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
