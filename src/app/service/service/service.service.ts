import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../models/models';
import { UtilService } from '../util-service/util.service';
import { CheckError } from '../util-service/error';
import { API_URL } from '../util-service/util.service';
const apiUrl = API_URL;
@Injectable({
    providedIn: 'root',
})
export class ServiceService {
    constructor(private http: HttpClient, private utilService: UtilService) {}

    getService(query: any, next: (res: any) => any) {
        this.http
            .get(`${apiUrl}/api/services` + query)
            .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }

    createHeader(head: Headers) {
        head.append('Authorization', this.utilService.getToken().token);
    }

    saveService(data: Service, next: (res: any) => any) {
        this.http
            .post(`${apiUrl}/api/service`, { data })
            .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }

    sumService(data: Service, next: (res: any) => any) {
        let head = new Headers();
        this.createHeader(head);
        this.http
            .get(`${apiUrl}/api/service/sum`, {
                // data
                // headers: head,
            })
            .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }

    updateService(data: Service, param: any, next: (res: any) => any) {
        this.http
            .put('${apiUrl}/api/service/' + param, data)
            .subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
}
