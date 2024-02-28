import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Customer } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { API_URL } from '../util-service/util.service';

// const apiUrl = process.env['API_URL'];
// const apiUrl = 'http://localhost:5050';
const apiUrl = API_URL;
@Injectable({
    providedIn: 'root',
})
export class SexService {
    constructor(private http: HttpClient) {}

    getAllSexes(next: (res: any) => any) {
        this.http
            .get(`${apiUrl}/api/sexes`)
            .subscribe(
                CheckError((res) => {
                    next(res);
                })
            );
    }
}
