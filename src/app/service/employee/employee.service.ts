import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { API_URL, UtilService } from '../util-service/util.service';
import { closeLoad, loadPage } from '../util-service/load';

// const apiUrl = process.env.API_URL;
const apiUrl = API_URL;

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private http: HttpClient, public uService: UtilService) {}

    getEmployee(query: any, next: (res: any) => any) {
        loadPage();

        this.http.get(`${apiUrl}/api/employee` + query).subscribe(
            CheckError((res) => {
                next(res);
                close();
                closeLoad();
            })
        );
    }
    getOneEmployee(query: any, next: (res: any) => any) {
        loadPage();
        let h = new Headers();
        h.append('Authorization', this.uService.getToken().token);
        this.http
            .get(`${apiUrl}/api/employee/` + query)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                closeLoad();

                })
            );
    }

    saveEmployee(data: Employee, next: (res: any) => any) {
        loadPage();

        this.http.post(`${apiUrl}/api/employee`, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
                closeLoad();

            })
        );
    }

    loginEmployee(data: Employee, next: (res: any) => any) {
        loadPage();

        this.http.post(`${apiUrl}/api/employee/connection`, data).subscribe(
            CheckError((res) => {
                const data: TokenObject = {};
                data.token = res.token;
                data.userId = res.userId;
                data.role = res.role;
                data.info = res.info;
                this.uService.saveDataStorage(
                    `sessionId`,
                    JSON.stringify(data)
                );
                next(res);
                closeLoad();

                close();
            })
        );
    }

    updateEmployee(data: Employee, param: any, next: (res: any) => any) {
        loadPage();

        this.http.put(`${apiUrl}/api/employee/` + param, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
                closeLoad();

            })
        );
    }

    getAllEmployees(next: (res: any) => any) {
        loadPage();
        this.http.get(`${apiUrl}/api/employees`).subscribe(
            CheckError((res) => {
                next(res);
                close();
                closeLoad();

            })
        );
    }

    savePersonnel(data: any, next: (res: any) => any) {
        loadPage();
        this.http.post(`${apiUrl}/api/employee`, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }

    updatePersonnel(data: any, id: any, next: (res: any) => any) {
        loadPage();

        this.http.put(`${apiUrl}/api/employee/` + id, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
                closeLoad();

            })
        );
    }

    deactivatePersonnel(id: any, next: (res: any) => any) {
        loadPage();
        this.http
            .put(`${apiUrl}/api/employee/${id}/deactivate`, null)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                closeLoad();

                })
            );
    }

    activatePersonnel(id: any, next: (res: any) => any) {
        loadPage();
        this.http.put(`${apiUrl}/api/employee/${id}/activate`, null).subscribe(
            CheckError((res) => {
                next(res);
                close();
                closeLoad();

            })
        );
    }
}
