import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Customer } from 'src/app/models/models';
import { CheckError } from '../util-service/error';

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:5050';

@Injectable({
    providedIn: 'root',
})
export class SexService {
    constructor(private http: HttpClient) {}

    getAllSexes(next: (res: any) => any) {
        this.http
            .get(`${apiUrl}/api/sexes`)
            .subscribe((res) => {
                next(res);
                close();
            });
    }
}
