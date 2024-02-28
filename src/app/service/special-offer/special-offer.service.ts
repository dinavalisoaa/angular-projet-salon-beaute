import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { API_URL, UtilService } from '../util-service/util.service';
import { closeLoad, loadPage } from '../util-service/load';

// const apiUrl = process.env.API_URL;
const apiUrl = API_URL;

@Injectable({
    providedIn: 'root',
})
export class SpecialOfferService {
    constructor(private http: HttpClient, public uService: UtilService) {}

    getSpecialOffers(next: (res: any) => any) {
        loadPage();
        this.http.get(`${apiUrl}/api/specialOffers`).subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();
                close();
            })
        );
    }

    saveSpecialOffer(data: any, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/specialOffer`, data).subscribe(
            CheckError((res) => {
                next(res);
            })
        );
    }
}
