import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Manager } from 'src/app/models/models';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})

export const CheckError = (next: (res: any) => any) => {
    return {
      next: next,
      error: (err: HttpError) => {
        let errorData: SweetAlertOptions = {icon: "error", title: "Erreur",};
        if (err.status === 0) {
          errorData.text = "Êtes-vous connecté a internet ?";
        }
        else if (err.status === 403 || err.status === 401) {
          errorData.text = "Veuillez vous connecter a un compte qui peut ouvrir cette Page !";
        }
        else if (500 - err.status <= 0) {
          errorData.text = "Une erreur est survenue"
        }
        else {
          errorData.text = err.error.error.message;
        }
        Swal.fire(errorData).then();
      }
    }
  };

export class CheckErrorService {

    constructor(private http: HttpClient) {}
    private handleError(error: HttpErrorResponse) {
        if (error.status == 0) {
        } else {
            alert(error.error.error);
        }
        return throwError(() => new Error('eeeeeeeeeeee'));
    }
    getManager(query: any, next: (res: any) => any) {
        this.http
            .get('http://localhost:5050/api/mange' + query)
            .subscribe((res) => {
                next(res);
            });
    }
    saveManager(data: Manager, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/Manager', data)
            .subscribe((res) => {
                next(res);
            });
    }

    loginManager(data: Manager, next: (res: any) => any) {
        this.http
            .post('http://localhost:5050/api/manager/connection', data)

            .subscribe((res) => {
                next(res);
            });
    }
    updateManager(data: Manager, param: any, next: (res: any) => any) {
        this.http
            .put('http://localhost:5050/api/appointment/' + param, data)
            .subscribe((res) => {
                next(res);
            });
    }
}
