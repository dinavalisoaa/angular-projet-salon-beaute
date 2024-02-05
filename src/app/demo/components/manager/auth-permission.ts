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
            return true;
        } else {
            this.router.navigate(['/403']);
            return true;
        }

    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        const token: TokenObject = this.service.getToken();
        if (token.role == route.data['role']) {
            return true;
            // this.router.navigate(['/service/service']);
        }
        // const router: Router = inject(Router);

        // if (token) {
        //     //   const userRole = this.authService.getRole();
        //     //   if (route.data['role'] ==token.role) {
        //     //     this.router.navigate(['/home']);
        //     //     return false;
        //     //   }
        console.log(
            token.userId + '+=aaaaaaaaaaaaaaaaaa=' + route.data['role']
        );
        return false;
        // }

        return false;
    }
}
