import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Manager, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { UtilService } from '../util-service/util.service';
import { API_URL } from '../util-service/util.service';
import { closeLoad, loadPage } from '../util-service/load';
const apiUrl = API_URL;
@Injectable({
    providedIn: 'root',
})
export class ManagerService {
    constructor(private http: HttpClient, public uService: UtilService) {}
    // private handleError(error: HttpErrorResponse) {
    //     if (error.status == 0) {
    //     } else {
    //         alert(error.error.error);
    //     }
    //     return throwError(() => new Error('eeeeeeeeeeee'));
    // }
    getManager(query: any, next: (res: any) => any) {
        this.http
            .get(`${apiUrl}/api/manager` + query)
           .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }

    getFinancialReview(year: any ,next: (res: any) => any) {
        loadPage();
        this.http
            .get(`${apiUrl}/api/dashboard/financial-review/${year}/per/month`)
           .subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();
                close();
            })
        );
    }

    getTotalAmount(next: (res: any) => any) {
        loadPage();

        this.http
            .get(`${apiUrl}/api/dashboard/amount/total`)
           .subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();
                close();
            })
        );
    }

    getDailySales(query: any, next: (res: any) => any) {
        let date = new HttpParams();
        Object.keys(query).forEach(key => {
            date = date.append(key, query[key]);
        });
        loadPage();

        this.http
            .get(`${apiUrl}/api/dashboard/sales/per/day`, { params: date })
           .subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();
                close();
            })
        );
    }

    saveManager(data: Manager, next: (res: any) => any) {
        this.http
            .post(`${apiUrl}/api/manager`, data)
           .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }

    loginManager(data: Manager, next: (res: any) => any) {
        this.http
            .post(`${apiUrl}/api/manager/connection`, data)
            .subscribe(
                CheckError((res) => {
                    const data: TokenObject = {
                    };
                    data.token = res.token;
                    data.userId = res.userId;
                    data.role=res.role;
                    data.info=res.info;
                    data.expiration = res.expiration;
                    this.uService.saveDataStorage('sessionId',JSON.stringify(data) );
                    next(res);
                    close();
                })
            );
    }
    updateManager(data: Manager, param: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/appointment/` + param, data)
           .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
}
