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
            if (this.checkExpiration(next, state)) {
                localStorage.removeItem('sessionId');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Votre session a expiré',
                    footer: '',
                });
                this.router.navigate(['/customer/login']);
                return true;
            } else {
                return true;
            }
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
    subtractDatePart(date: any, hours: any) {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + hours);
        // const datePart = {
        //     day: new Date(newDate).getDate(),
        //     month: new Date(newDate).getMonth() + 1,
        //     hour: new Date(newDate).getHours(),
        //     minute: new Date(newDate).getMinutes(),
        // };
        return new Date(
            new Date(newDate).getFullYear(),
            new Date(newDate).getMonth(),
            new Date(newDate).getDate(),
            new Date(newDate).getHours(),
            new Date(newDate).getMinutes()
        );
    }

    checkExpiration(route: ActivatedRouteSnapshot, url: any): boolean {
        const token: TokenObject = this.service.getToken();
        let news = this.subtractDatePart(new Date(), 0);
        let token_date = this.subtractDatePart(new Date(token.expiration), -3);
        const retours: boolean =
            token_date.getTime() <= new Date(news).getTime();
        console.log(token_date.getTime() + '(<11>)' + token_date.getTime());
        console.log(new Date(news) + '(21)' + new Date(news).getTime());
        console.log(new Date() + '(21)' + new Date().getTime());
        if (retours) {
            return true;
        }
        return false;
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
