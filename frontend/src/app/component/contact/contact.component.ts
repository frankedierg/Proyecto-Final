import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/Servicios/peticion.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  peticion: any;
 
  
  

  constructor(private emailpeticion:PeticionService) {
   
   }
   name: String = "{{post.name}}"
   email: String = ""
   subject: String =""
   content: String = ""

  ngOnInit(): void {
  }
  emailing(){
    var post = {
      host:this.emailpeticion.urlLocal,
      path:"/usuarios/emailing",
      payload:{
        name:this.name,
        email:this.email,
        subject:this.subject,
        content:this.content
        
      }

    }
    this.emailpeticion.Post(post.host + post.path, post.payload ).then((res:any)=>{
      console.log(res)
      
      
    })
  }
}
    //FIN PETICIÓN

