import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Customer } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { UtilService } from '../util-service/util.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient, private uService: UtilService) {}
    // getState(val:number,id: string) {

    // }
    getAccount(query: any, next: (res: any) => any) {
        let h = new Headers();
        h.append('Authorization', this.uService.getToken().token);
        this.http
            .get('http://localhost:5050/api/accounts' + query, {
                headers: {
                    Authorization: this.uService.getToken().token,
                },
            })
            .subscribe(
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
                alert(res.message);
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
