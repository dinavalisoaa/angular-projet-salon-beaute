import { DataView } from 'primeng/dataview';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer, TokenObject } from 'src/app/models/models';
import { CheckError } from '../util-service/error';
import { API_URL, UtilService } from '../util-service/util.service';
import { closeLoad, loadPage } from '../util-service/load';

// const apiUrl = process.env.API_URL;
const apiUrl = API_URL;

@Injectable()
export class ReservationService {

    constructor(private http: HttpClient, public uService: UtilService) {}

    getNumberPerDay(next: (res: any) => any) {
        loadPage();
        this.http.get(`${apiUrl}/api/dashboard/reservations/list/per/day`).subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();
                close();
            })
        );
    }

    getAllReservations(next: (res: any) => any) {
        loadPage();
        this.http.get(`${apiUrl}/api/dashboard/reservations/list`).subscribe(
            CheckError((res) => {
                next(res);
                closeLoad();

                close();
            })
        );
    }

}
