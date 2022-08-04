import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';
declare var swal:any

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  _id:string =""
  fname:string = ""
  mname:string = ""
  lname:string = ""
  slname:string = ""
  email:string = ""
  phone:string = ""
  pass:string = ""
  confirmar:string = ""
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
    //swal("Good job!", "You clicked the button!", "success");
    this.validar()
    if (this.erroremail == "" && this.errornombre == "") {
      //PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/admin/registro",
      payload:{
        fname:this.fname,
        mname:this.mname,
        lname:this.lname,
        slname:this.slname,
        email:this.email,
        phone:this.phone,
        pass:this.pass,
        confirmar:this.confirmar
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        swal("Muy bien!", "El visitante se ha ingresado!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        swal("Algo salió mal!", "El visitante  ya está registrado!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
      
    }
    else{
      swal("Algo salió mal!", "Error en el formulario!", " error");
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
      path:"/admin/listar",
      payload:{
        
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      this.datos = res.admin
    })
    
    
  //}

}

  Eliminar(email:string){
  
    var post = {
      host:this.peticion.urlLocal,
      path:"/admin/eliminar",
      payload:{
        email:email
       
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        swal("Muy bien!", "El visitante ha salido!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,5000)
        this.cargartodas()
      }
      else{
        swal("Algo salió mal!", "El visitante no ha salido!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
  }

  Editar(myid:string){

    this.idseleccionado = myid
    var post = {
      host:this.peticion.urlLocal,
      path:"/admin/CargarId",
      payload:{
        id:myid
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
       
       this.fname = res.admin[0].fname
       this.mname = res.admin[0].mname
       this.lname = res.admin[0].lname
       this.slname = res.admin[0].slname
       this.email = res.admin[0].email
       this.phone = res.admin[0].phone
       


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
    this.idseleccionado = ""
    this.pass = ""
    this.confirmar = ""

  }

  Actualizar(){

    var post = {
      host:this.peticion.urlLocal,
      path:"/admin/actualizar",
      payload:{
        id:this.idseleccionado,
        fname:this.fname,
        mname:this.mname,
        lname:this.lname,
        slname:this.slname,
        email:this.email,
        phone:this.phone,
        pass:this.pass,
        confirmar:this.confirmar
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        swal("Muy bien!", "Se ha actualizado la inforación!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        swal("Algo salió mal!", "No se actualizó al información!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 

  }


}
