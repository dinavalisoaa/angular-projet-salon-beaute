import { HttpErrorResponse } from '@angular/common/http';
import  Swal from 'sweetalert2';

export const CheckError = (next: (res: any) => any) => {
    return {

        next: next,
        error: (err: HttpErrorResponse) => {
            let errorData: any = {};

            if (err.status === 0) {
                errorData.text = 'Êtes-vous connecté à internet ?';
            } else if (500 - err.status <= 0) {
                console.log(err);
                errorData.text = err.error.error;
            } else {
                errorData.text = err.error.error;
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorData.text,
                footer: '',
            });
        },
    };
};
