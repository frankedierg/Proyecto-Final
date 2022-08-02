import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/Servicios/mensajes.service';
import { PeticionService } from 'src/app/Servicios/peticion.service';

@Component({
  selector: 'app-cuotas-admon',
  templateUrl: './cuotas-admon.component.html',
  styleUrls: ['./cuotas-admon.component.css']
})
export class CuotasAdmonComponent implements OnInit {

  id:string =""
  nombre:string =""
  apellido:string = ""
  unitname:string = ""
  complement:string = ""
  paymentdate:string =""
  monthpayment:string =""
  file:string=""
  errornombre:string = ""
  errorapellido:string = ""
  idseleccionado:string = ""
  
  respuestalogin:any
  constructor(private peticion:PeticionService,private msg:MensajesService) { }
  ngOnInit(): void {
    this.cargartodas()
  }

 
  validar(){// validación en el frontend
    this.errornombre = ""
    this.errorapellido = ""
    if(this.nombre == "" || this.nombre == undefined || this.nombre == null){
      this.errornombre = "Este campo es obligatorio"
    }

    if(this.apellido == "" || this.apellido == undefined || this.apellido == null){
      this.errorapellido = "El campo apellido es obligatorio"
    }
  }

  datos:any[] = [
    {nombre:this.nombre,apellido:this.apellido,unitname:this.unitname,complement:this.complement,paymentdate:this.paymentdate,monthpayment:this.monthpayment,file:this.file}
  ]
  registrar(){
    //swal("Good job!", "You clicked the button!", "success");
    this.validar()
    if (this.errornombre == "" && this.errorapellido == "") {
      //PETICIÓN
    var post = {
      host:this.peticion.urlLocal,
      path:"/pagos/registro",
      payload:{
        nombre:this.nombre,
        apellido: this.apellido,
        unitname:this.unitname,
        complement:this.complement,
        paymentdate:this.paymentdate,
        monthpayment:this.monthpayment,
        file:this.file
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
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
      path:"/pagos/listar",
      payload:{
        
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      this.datos = res.pagos
    })
    
    
  //}

}

  Eliminar(email:string){
  
    var post = {
      host:this.peticion.urlLocal,
      path:"/pagos/eliminar",
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

  Editar(myid:string){

    this.idseleccionado = myid
    var post = {
      host:this.peticion.urlLocal,
      path:"/pagos/CargarId",
      payload:{
        id:myid
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
       
      this.nombre = res.pagos[0].nombre
      this.apellido = res.pagos[0].apellido
      this.unitname = res.pagos[0].unitname
      this.complement = res.pagos[0].complement
      this.paymentdate = res.pagos[0].paymentdate
      this.monthpayment = res.pagos[0].monthpayment



      }
      
     })




  }

  Nuevo(){

   this.nombre= ""
    this.apellido = ""
    this.unitname = ""
    this.complement = ""
    this.paymentdate = ""
    this.monthpayment = ""
    this.file = ""
  }

  Actualizar(){

    var post = {
      host:this.peticion.urlLocal,
      path:"/pagos/actualizar",
      payload:{
        id:this.idseleccionado,
        nombre:this.nombre,
        apellido: this.apellido,
        unitname:this.unitname,
        complement:this.complement,
        paymentdate:this.paymentdate,
        monthpayment:this.monthpayment,
        file:this.file
        
      }

    }
    this.peticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        this.msg.Agregarmensaje('success',res.mensaje,15000)
        this.cargartodas()
        this.Nuevo()
      }
      else{
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
     }) 

  }

}
