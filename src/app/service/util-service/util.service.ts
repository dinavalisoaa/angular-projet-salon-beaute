import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Manager } from 'src/app/models/models';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor(private http: HttpClient,private router:Router) {}

    getToken () {
        const tokenObjectString = localStorage.getItem('sessionId');
        return JSON.parse(tokenObjectString || "{}");
    }

    saveDataStorage(key: any, value: any) {
        localStorage.setItem(key, value);
    }
    formatted(price:number) {
       return price.toLocaleString('en-FR');
    }

    getDataStorage(key: any) {
        return localStorage.getItem(key);
    }
    removeDataStorage(key: any) {
        localStorage.removeItem(key);
    }

    navigateTo(url:string){
        this.router.navigate([url])
    }

    getTimeFromDate(date: any){
        const fullTime = date.split("T")[1];
        const hourPart = fullTime.split(":")[0];
        const minutePart = fullTime.split(":")[1].split(":")[0];
        return hourPart + ":" +  minutePart;
    }

    extractDateFromDate(date: any){
        const datePart = date.split("T")[0];
        return datePart;
    }
}
