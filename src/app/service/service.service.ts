 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

    constructor(private http: HttpClient) { }

//   getDataFromService(col?:string,order?:string) {
//     this.nomDuService.getData(col,order).subscribe(
//       (data) => {
//         this.dataArray = data.data;
//         console.log('Data retrieved:', data);
//       },
//       (error) => {s
//         console.error('Error fetching data:', error);
//       }
//     );
//   }
//   getService(next:any) {
//     this.http.get<Service[]>("http://localhost:5050/api/service");
//       this.http.get("http://localhost:5050/api/service").subscribe((res => {
//         close();
//         next(res);
//       }))

//   }
getService(next: (res: any) => any){
      this.http.get("http://localhost:5050/api/service").subscribe((res=>{
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
