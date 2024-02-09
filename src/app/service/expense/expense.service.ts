import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/models/models';
import { API_URL } from '../util-service/util.service';
import { CheckError } from '../util-service/error';
const apiUrl = API_URL;

@Injectable({
    providedIn: 'root',
})
export class ExpenseService {
    constructor(private http: HttpClient) {}

    getExpense(query: any, next: (res: any) => any) {
        this.http.get(`${apiUrl}/api/expense` + query).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
    saveExpense(data: Expense, next: (res: any) => any) {
        this.http.post(`${apiUrl}/api/expense`, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
    updateExpense(data: Expense, param: any, next: (res: any) => any) {
        this.http.put(`${apiUrl}/api/expense/` + param, data).subscribe(
            CheckError((res) => {
                next(res);
                close();
            })
        );
    }
}
