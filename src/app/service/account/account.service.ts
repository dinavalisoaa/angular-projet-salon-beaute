import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Customer } from 'src/app/models/models';
import { CheckError } from '../util-service/error';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) {}

    getAccount(query: any, next: (res: any) => any) {
        this.http.get('http://localhost:5050/api/account' + query).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
    getAccountState(id: string, next: (res: any) => any) {
        this.http
            .get('http://localhost:5050/api/account/state?id=' + id)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                })
            );
    }
    saveAccount(data: Account, next: (res: any) => any) {
        this.http.post('http://localhost:5050/api/account', data).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
    updateAccount(data: Account, param: any, next: (res: any) => any) {
        this.http
            .put('http://localhost:5050/api/account/' + param, data)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                })
            );
    }
}
