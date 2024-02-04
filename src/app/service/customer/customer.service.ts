import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Customer, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { UtilService } from '../util-service/util.service';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient, public uService: UtilService) {}

    getCustomer(query: any, next: (res: any) => any) {
        this.http
            .get('http://localhost:5050/api/customer' + query)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
    saveCustomer(data: Customer, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/customer', data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    loginCustomer(data: Customer, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/customer/connection', data)
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
    updateCustomer(data: Customer, param: any, next: (res: any) => any) {
        this.http
            .put('http://localhost:5050/api/customer/' + param, data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
}
