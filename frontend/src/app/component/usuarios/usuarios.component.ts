import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';


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
  idseleccionado:string = ""
  
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
        swal("Usuario Creado!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        swal("Usuario ya existe!", "Haz click para cerrar!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
      
    }
    else{
      swal("Error en el formulario!", "Haz click para cerrar!", "error");
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
        swal("Usuario eliminado!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,5000)
        this.cargartodas()
      }
      else{
        swal("No se eliminó el usuario!", "Haz click para cerrar!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
  }

  Editar(myid:string){

    this.idseleccionado = myid
    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/CargarId",
      payload:{
        id:myid
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
       
       this.fname = res.usuarios[0].fname
       this.mname = res.usuarios[0].mname
       this.lname = res.usuarios[0].lname
       this.slname = res.usuarios[0].slname
       this.email = res.usuarios[0].email
       this.phone = res.usuarios[0].phone
       this.unitname = res.usuarios[0].unitname
       this.complement = res.usuarios[0].complement
       this.unitcategory = res.usuarios[0].unitcategory
       this.buildingname = res.usuarios[0].buildingname



      }
      
     })




  }

  Nuevo(){

    this.fname = ""
    this.mname = ""
    this.lname = ""
    this.slname = ""
    this.email = ""
    this.phone = ""
    this.unitname = ""
    this.complement = ""
    this.unitcategory = ""
    this.buildingname = ""
    this.idseleccionado = ""
    this.password = ""
    this.confirmar = ""

  }

  Actualizar(){

    var post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/actualizar",
      payload:{
        id:this.idseleccionado,
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
        swal("Usuario actualizado!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        swal("No se actualizó el usuario!", "Haz click para cerrar!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 

  }


}
