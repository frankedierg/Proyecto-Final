import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';
declare var swal:any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  _id:string =""
  fname:string = ""
  mname:string = ""
  lname:string = ""
  slname:string = ""
  email:string = ""
  phone:string = ""
  password:string = ""
  confirmar:string = ""
  unitname:string = ""
  complement:string = ""
  unitcategory:string =""
  buildingname:string =""
  errornombre:string = ""
  erroremail:string = ""
  
  respuestalogin:any
  constructor(private peticion:PeticionService,private msg:MensajesService) { }
  ngOnInit(): void {
    this.cargartodas()
  }

 
  validar(){// validación en el frontend
    this.errornombre = ""
    this.erroremail = ""
    if(this.fname == "" || this.fname == undefined || this.fname == null){
      this.errornombre = "Este campo es obligatorio"
    }

    if(this.email == "" || this.email == undefined || this.email == null){
      this.erroremail = "El campo email es obligatorio"
    }
  }

  datos:any[] = [
    {fname:this.fname,mname:this.mname,lname:this.lname,slname:this.slname,email:this.email}
  ]
  registrar(){
    //swal("Good job!", "You clicked the button!", "success");
    this.validar()
    if (this.erroremail == "" && this.errornombre == "") {
      //PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/registro",
      payload:{
        fname:this.fname,
        mname:this.mname,
        lname:this.lname,
        slname:this.slname,
        email:this.email,
        phone:this.phone,
        unitname:this.unitname,
        complement:this.complement,
        unitcategory:this.unitcategory,
        building:this.buildingname,
        password:this.password,
        confirmar:this.confirmar
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
      }
      else{
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
      
    }
    else{
      this.msg.Agregarmensaje('danger','Error en el formulario',5000)
    }
    
  }

  cargartodas(){
    //swal("Good job!", "You clicked the button!", "success");
    // this.validar()
    // if (this.erroremail == "" && this.errornombre == "") {
      //PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/listar",
      payload:{
        
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      this.datos = res.usuarios
    })
    
    
  //}

}

  Eliminar(email:string){
  
    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/eliminar",
      payload:{
        email:email
       
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        this.msg.Agregarmensaje('success',res.mensaje,5000)
        this.cargartodas()
      }
      else{
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
  }


}
