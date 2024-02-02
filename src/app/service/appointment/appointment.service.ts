import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


    constructor(private http: HttpClient) { }

getAppointment(query:any ,next: (res: any) => any){

      this.http.get("http://localhost:5050/api/appointment"+query).subscribe((res=>{
        next(res);
        close();
      }))
  }
  saveAppointment(data:Appointment,next: (res: any) => any){
    this.http.post("http://localhost:5050/api/appointment",data).subscribe((res=>{
      next(res);
      close();
    }))
}
updateAppointment(data:Appointment,param:any, next: (res: any) => any){
    this.http.put("http://localhost:5050/api/appointment/"+param,data).subscribe((res=>{
      next(res);
      close();
    }))

}

}
