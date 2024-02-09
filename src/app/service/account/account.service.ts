import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Customer } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { API_URL, UtilService } from '../util-service/util.service';
import Swal from 'sweetalert2';
const apiUrl =API_URL;

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
            .get(`${apiUrl}/api/accounts` + query, {
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
            .get(`${apiUrl}/api/account/state?id=` + id)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                })
            );
    }
    saveAccount(data: Account, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/account`, data).subscribe(
            CheckError((res) => {
                next(res);
                // Swal.showLoading(Swal.getDenyButton())
                Swal.fire({
                    icon: 'success',
                    title: 'Message',
                    text:res.message,
                    footer: '',
                });
                // alert();
                close();

            })
        );
    }
    updateAccount(data: Account, param: any, next: (res: any) => any) {
        this.http
            .put(`${apiUrl}/api/account/` + param, data)
            .subscribe(
                CheckError((res) => {
                    next(res);
                    close();
                })
            );
    }
}
