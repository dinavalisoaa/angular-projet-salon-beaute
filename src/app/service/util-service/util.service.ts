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

    //   registerToken (value: TokenObject) {
    //     this.storage.setItem(config.tokenKey, JSON.stringify(value));
    //     this.token = value;
    //   }

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
}
