 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

    constructor(private http: HttpClient) { }

getService(query:any ,next: (res: any) => any){

      this.http.get("http://localhost:5050/api/services"+query).subscribe((res=>{
        next(res);
        close();
      }))
  }
  saveService(data:Service,next: (res: any) => any){
    this.http.post("http://localhost:5050/api/service",data).subscribe((res=>{
      next(res);
      close();
    }))
}
updateService(data:Service,param:any, next: (res: any) => any){
    this.http.put("http://localhost:5050/api/service/"+param,data).subscribe((res=>{
      next(res);
      close();
    }))

}

}
