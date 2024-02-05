import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Manager, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { UtilService } from '../util-service/util.service';

@Injectable({
    providedIn: 'root',
})
export class ManagerService {
    constructor(private http: HttpClient, public uService: UtilService) {}
    private handleError(error: HttpErrorResponse) {
        if (error.status == 0) {
        } else {
            alert(error.error.error);
        }
        return throwError(() => new Error('eeeeeeeeeeee'));
    }
    getManager(query: any, next: (res: any) => any) {
        this.http
            .get('http://localhost:5050/api/mange' + query)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
    saveManager(data: Manager, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/Manager', data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }

    loginManager(data: Manager, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/manager/connection', data)
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
    updateManager(data: Manager, param: any, next: (res: any) => any) {
        this.http
            .put('http://localhost:5050/api/appointment/' + param, data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
}
