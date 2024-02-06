import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { UtilService } from '../util-service/util.service';

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:5050';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private http: HttpClient, public uService: UtilService) {}

    getEmployee(query: any, next: (res: any) => any) {
        this.http
            .get('http://localhost:5050/api/employee' + query)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    saveEmployee(data: Employee, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/employee', data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    loginEmployee(data: Employee, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/employee/connection', data)
            .subscribe(
                CheckError((res) => {
                    const data: TokenObject = {
                    };
                    data.token = res.token;
                    data.userId = res.userId;
                    data.role=res.role;
                    data.info=res.info;
                    this.uService.saveDataStorage('sessionId',JSON.stringify(data) );
                    next(res);
                    close();
                })
            );
    }

    updateEmployee(data: Employee, param: any, next: (res: any) => any) {
        this.http
            .put('http://localhost:5050/api/employee/' + param, data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    getAllEmployees(next: (res: any) => any) {
        this.http
            .get(`${apiUrl}/api/employees`)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    savePersonnel(data: any, next: (res: any) => any) {
        this.http
            .post(`${apiUrl}/api/employee`, data )
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    updatePersonnel(data: any, id: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/employee/` + id, data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    deactivatePersonnel(id: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/employee/${id}/deactivate`, null)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    activatePersonnel(id: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/employee/${id}/activate`, null)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
}
