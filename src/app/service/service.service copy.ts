import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/models';
import { Observable } from 'rxjs/internal/Observable';



export class ServiceService {

    constructor(private http: HttpClient) { }

    getServices(): Observable<any> {
        return this.http.get<any>('http://localhost:5050/api/service')
            .toPromise()
            .then(res => res.data as Service[])
            .then(data => data);
    }



    // getServicesMixed() {
    //     return this.http.get<any>('assets/demo/data/products-mixed.json')
    //         .toPromise()
    //         .then(res => res.data as Service[])
    //         .then(data => data);
    // }

    // getServicesWithOrdersSmall() {
    //     return this.http.get<any>('assets/demo/data/products-orders-small.json')
    //         .toPromise()
    //         .then(res => res.data as Service[])
    //         .then(data => data);
    // }
}
