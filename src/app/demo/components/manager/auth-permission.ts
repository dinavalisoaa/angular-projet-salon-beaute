import { Injectable, inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { TokenObject } from 'src/app/models/models';
import { ManagerService } from 'src/app/service/manager/manager.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardPermission implements CanActivate {
    constructor(private router: Router, public service: UtilService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.checkUserLogin(next, state)) {
            // if (this.service.checkExpiration()) {
            //     localStorage.removeItem('sessionId');
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: 'Votre session a expiré',
            //         footer: '',
            //     });
            //     this.router.navigate(['/customer/login']);
            //     return true;
            // } else {
            //     return true;
            // }
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vous n' êtes autorisé ",
                footer: '',
            });
            this.router.navigate(['/403']);
            return true;
        }
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        const token: TokenObject = this.service.getToken();

        if (token.role == route.data['role']) {
            return true;
        }

        console.log(
            token.userId + '+=aaaaaaaaaaaaaaaaaa=' + route.data['role']
        );
        return false;
        // }

        return false;
    }
}
