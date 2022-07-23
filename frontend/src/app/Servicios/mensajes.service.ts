import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  public msgDatos:any[]= [

    
  ]

  Agregarmensaje(tipox:string,mensajesx:string,tiempo:number){
    this.msgDatos.push({tipo:tipox,mensaje:mensajesx})
    this.eliminarmensaje(tiempo)
  }

  eliminarmensaje(tiempo:number){
    setTimeout(() => {
      this.msgDatos.splice(0,1)
    }, tiempo);
  }
}
