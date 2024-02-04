import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../models/models';
import { UtilService } from '../util-service/util.service';

@Injectable({
    providedIn: 'root',
})
export class ServiceService {
    constructor(private http: HttpClient, private utilService: UtilService) {}

    getService(query: any, next: (res: any) => any) {
        this.http
            .get('http://localhost:5050/api/services' + query)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
    createHeader(head: Headers) {
        head.append('Authorization', this.utilService.getToken().token);
    }
    saveService(data: Service, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/service', { data })
            .subscribe((res) => {
                next(res);
                close();
            });
    }
    sumService(data: Service, next: (res: any) => any) {
        let head = new Headers();
        this.createHeader(head);
        this.http
            .get('http://localhost:5050/api/service/sum', {
                // data
                // headers: head,
            })
            .subscribe((res) => {
                next(res);
                close();
            });
    }
    updateService(data: Service, param: any, next: (res: any) => any) {
        this.http
            .put('http://localhost:5050/api/service/' + param, data)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
}
