import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


    constructor(private http: HttpClient) { }

getExpense(query:any ,next: (res: any) => any){

      this.http.get("http://localhost:5050/api/expense"+query).subscribe((res=>{
        next(res);
        close();
      }))
  }
  saveExpense(data:Expense,next: (res: any) => any){
    this.http.post("http://localhost:5050/api/expense",data).subscribe((res=>{
      next(res);
      close();
    }))
}
updateExpense(data:Expense,param:any, next: (res: any) => any){
    this.http.put("http://localhost:5050/api/expense/"+param,data).subscribe((res=>{
      next(res);
      close();
    }))

}

}
