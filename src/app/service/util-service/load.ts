import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
export function loadPage() {
    Swal.fire({
        allowOutsideClick: false,
        title: 'Rechargement....',
        didOpen: () => {
            Swal.showLoading();
        },
    });
}
export function closeLoad() {
    Swal.close();
}
