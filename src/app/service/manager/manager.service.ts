import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {


    constructor(private http: HttpClient) { }

getManager(query:any ,next: (res: any) => any){
      this.http.get("http://localhost:5050/api/Manager"+query).subscribe((res=>{
        next(res);
        close();
      }))
  }
  saveManager(data:Manager,next: (res: any) => any){
    this.http.post("http://localhost:5050/api/Manager",data).subscribe((res=>{
      next(res);
      close();
    }))
}
updateManager(data:Manager,param:any, next: (res: any) => any){
    this.http.put("http://localhost:5050/api/appointment/"+param,data).subscribe((res=>{
      next(res);
      close();
    }))

}

}
