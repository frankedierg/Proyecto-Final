import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubirarchivosService {

  constructor(private http: HttpClient) { }

upload(file: File,url:string,inputName:string): Observable<HttpEvent<any>> {

  const formData:FormData = new FormData()
  formData.append(inputName,file)

  const req = new HttpRequest('POST',url,formData, {
    reportProgress:true,
    responseType:'json'
  })

  return this.http.request(req)
  
}

  

}
