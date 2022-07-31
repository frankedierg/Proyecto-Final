import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';
declare var swal:any

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css']
})
export class VisitantesComponent implements OnInit {

  _id:string =""
  name:string = ""
  lname:string = ""
  document:string = ""
  unitname:string = ""
  complement:string = ""
  vehicle:string = ""
  errornombre:string = ""
  errordocumento:string = ""
  idseleccionado:string = ""
  
  respuestalogin:any
  constructor(private peticion:PeticionService,private msg:MensajesService) { }
  ngOnInit(): void {
    this.cargartodas()
  }

 
  validar(){// validación en el frontend
    this.errornombre = ""
    this.errordocumento = ""
    if(this.name == "" || this.name == undefined || this.name == null){
      this.errornombre = "Este campo es obligatorio"
    }

    if(this.document == "" || this.document == undefined || this.document == null){
      this.errordocumento = "El campo ducumento es obligatorio"
    }
  }

  datos:any[] = [
    {name:this.name,lname:this.lname,document:this.document,unitname:this.unitname}
  ]
  registrar(){
    this.validar()
    if (this.errordocumento == "" && this.errornombre == "") {
      //PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/visitantes/registro",
      payload:{
        name:this.name,
        lname:this.lname,
        document:this.document,
        unitname:this.unitname,
        complement:this.complement,
        vehicle:this.vehicle,
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        swal("Visitante registrado!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        swal("El visitante ya existe!", "Haz click para cerrar!", "error");
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
      path:"/visitantes/listar",
      payload:{
        
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      this.datos = res.visitantes
    })
    
    
  //}

}

  Eliminar(email:string){
  
    var post = {
      host:this.peticion.urlLocal,
      path:"/visitantes/eliminar",
      payload:{
        email:email
       
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        swal("Visitante eliminado!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,5000)
        this.cargartodas()
      }
      else{
        swal("No se eliminó el visitante!", "Haz click para cerrar!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 
  }

  Editar(myid:string){

    this.idseleccionado = myid
    var post = {
      host:this.peticion.urlLocal,
      path:"/visitantes/CargarId",
      payload:{
        id:myid
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
       
       this.name = res.visitantes[0].name
       this.lname = res.visitantes[0].lname
       this.document = res.visitantes[0].document
       this.unitname = res.visitantes[0].unitname
       this.complement = res.visitantes[0].complement
       this.vehicle = res.visitantes[0].vehicle
      }
      
     })




  }

  Nuevo(){

    this.name = ""
    this.lname = ""
    this.document = ""
    this.unitname = ""
    this.complement = ""
    this.vehicle = ""
  }

  Actualizar(){

    var post = {
      host:this.peticion.urlLocal,
      path:"/visitantes/actualizar",
      payload:{
        id:this.idseleccionado,
        name:this.name,
        lname:this.lname,
        document:this.document,
        unitname:this.unitname,
        complement:this.complement,
        vehicle:this.vehicle,
        }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        swal("Visitante Actualizado!", "Haz click para cerrar!", "success");
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        swal("No se actualizó el visitante!", "Haz click para cerrar!", "error");
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 

  }


}
