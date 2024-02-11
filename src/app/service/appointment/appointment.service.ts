import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/app/models/models';
import { API_URL, UtilService } from '../util-service/util.service';
import { CheckError } from '../util-service/error';

const apiUrl = API_URL;

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    constructor(private http: HttpClient) {}
    getAppointment2(query: any,sort:Appointment, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/appointments` + query,sort).subscribe(
            CheckError((res) => {
                next(res);
                return res;
            })
        );
    }
    getAppointment(query: any,sort:Appointment, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/appointments` + query,sort).subscribe(
            CheckError((res) => {
                next(res);
                // close();
            })
        );
    }
    saveAppointment(data: Appointment, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/appointment`, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
    updateAppointment(data: Appointment, param: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/appointment/` + param, data)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                })
            );
    }
    patchAppointment(data: Appointment, param: any, next: (res: any) => any) {
        this.http
            .patch(`${apiUrl}/api/appointment/` + param, data)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                })
            );
    }
}
