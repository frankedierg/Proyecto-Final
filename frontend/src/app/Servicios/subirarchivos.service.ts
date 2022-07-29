import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirarchivosService {

  

    selectedFiles:any;
    archivoseleccionado:any;
    progress = 0;
    message = '';
    booocultarbtns: boolean = false

    constructor(private uploadService: SubirarchivosService) { }

    @Input() urldestino:string = ""
    @Input() path: String = ""
    @Input() fileName: String = ""

    ngOnInit(): void {

    }

    selectFile(event:any): void{
      this.selectedFiles = event.target.files;
    }

    upload(): void{
      this.progress = 0;
      this.archivoseleccionado = this.selectedFiles.item(0);
    }

}
