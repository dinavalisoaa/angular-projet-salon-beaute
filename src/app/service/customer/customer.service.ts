import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Customer, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { API_URL, UtilService } from '../util-service/util.service';
import { closeLoad, loadPage } from '../util-service/load';

// const apiUrl = process.env.API_URL;
const apiUrl = API_URL;
@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient, public uService: UtilService) {}

    getCustomer(query: any, next: (res: any) => any) {
        this.http.get(`${apiUrl}/api/customers` + query).subscribe(
            CheckError((res) => {
                next(res);
            })
        );
    }
    getOneCustomer(query: any, next: (res: any) => any) {
        loadPage();
        this.http.get(`${apiUrl}/api/customer/` + query).subscribe(
            CheckError((res) => {
                next(res);
            closeLoad();

                close();

            })
        );
    }

    saveCustomer(data: Customer, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/customer`, data).subscribe(
            CheckError((res) => {
                next(res);
            })
        );
    }

    registration(data: Customer, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/customer/registration`, data).subscribe(
            CheckError((res) => {

                next(res);
            })
        );
    }

    loginCustomer(data: Customer, next: (res: any) => any) {
        loadPage();
        this.http.post(`${apiUrl}/api/customer/connection`, data).subscribe(
            CheckError((res) => {
                const data: TokenObject = {};
                data.token = res.token;
                data.userId = res.userId;
                data.role = res.role;
                data.info = res.info;
                data.expiration = res.expiration;
                console.log(data);
                this.uService.saveDataStorage(
                    'sessionId',
                    JSON.stringify(data)
                );
                closeLoad();
                next(res);
            })
        );
    }

    updateCustomer(data: Customer, param: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/customer/` + param, data)
            .subscribe( CheckError((res) => {
                next(res);
            })
        );
    }

    choosePreferredService(data: any, id: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/customer/${id}/choose/service`, data)
            .subscribe( CheckError((res) => {
                next(res);
            })
        );
    }

    choosePreferredEmployee(data: any, id: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/customer/${id}/choose/employee`, data)
            .subscribe( CheckError((res) => {
                next(res);
            })
        );
    }

    getCustomerServices(customerId: any, next: (res: any) => any) {
        loadPage();
        this.http
            .get(`${apiUrl}/api/customer/${customerId}/services`)
            .subscribe( CheckError((res) => {
                next(res);
                closeLoad();
            })
        );
    }

    getCustomerEmployees(customerId: any, next: (res: any) => any) {
        this.http
            .get(`${apiUrl}/api/customer/${customerId}/employees`)
            .subscribe( CheckError((res) => {
                next(res);
            })
        );
    }

    getAppointmentHistory(customerId: any, next: (res: any) => any) {
        loadPage();
        this.http
            .get(`${apiUrl}/api/appointment/customer/${customerId}`)
            .subscribe( CheckError((res) => {
                next(res);
                closeLoad();
                close();

            })
        );
    }

    sendScheduledEmail(data: any, next: (res: any) => any) {
        this.http
            .post(`${apiUrl}/api/email/scheduled/send`, data)
            .subscribe((res) => {
                next(res);
            });
    }
}
