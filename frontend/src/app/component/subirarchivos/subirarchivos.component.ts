import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SubirarchivosService } from 'src/app/Servicios/subirarchivos.service';

//import { SubirarchivosService } from 'src/app/Servicios/subirarchivos.service';


@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrls: ['./subirarchivos.component.css']
})
export class SubirarchivosComponent implements OnInit {
  selectedFiles:any;
  progress:number = 0;
  archivoseleccionado:any;
  mensaje:string = ''

  constructor(private uploadService:SubirarchivosService) { }

  ngOnInit(): void {
  }

  @Input() urldestino:string = ''
  @Input() path:string = ''
  @Input() fileName:string = ''

  selectFile(event:any):void{
    this.selectedFiles = event.target.files
  }

  upload(){
    this.progress = 0
    this.archivoseleccionado = this.selectedFiles.item(0)

    this.uploadService.upload(this.archivoseleccionado,this.urldestino + this.path,this.fileName).subscribe(
      (event:any) => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total)
        }
        else if (event instanceof HttpResponse) {
          this.mensaje = event.body.mensaje

        }
           
      },
      err => {
        this.progress = 0
        this.mensaje = 'error cargando archivo'
        this.archivoseleccionado = undefined
      }

    )
    this.selectedFiles = undefined
  }





}