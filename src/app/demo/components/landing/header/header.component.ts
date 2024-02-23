import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { TokenObject } from 'src/app/models/models';
import { AccountService } from 'src/app/service/account/account.service';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    getToken() {
        const token: TokenObject = this.utilService.getToken();
        return token;
    }
    getName() {
        const token: TokenObject = this.getToken();
        if(token.role=='MANAGER')return 'ADMIN'

        if (token.userId != null) {
        if(token.role=='EMP')return 'EMP :'+token?.info?.name;

            return token?.info?.name;
        }
        return undefined;
    }
    navigate() {
        this.router.navigate([this.url()]);
    }
    url() {
        const token: TokenObject = this.getToken();
        if (token.userId != null) {
            // return token.role;
            if (token.role == 'CUSTOMER') {
                return 'customer/profile';
            } else if (token.role == 'EMP') {
                return 'employee/task';
            } else if (token.role == 'MANAGER') {
                return 'manager/dashboard';
            }
        }
        return 'customer/login';
    }
    logged() {
        const token: TokenObject = this.getToken();
        if (token.userId != null) {
            return true;
        }
        return false;
    }
    isAdmin() {
        const token: TokenObject = this.getToken();
        if (token.userId != null && token.role=='MANAGER') {
            return true;
        }
        return false;
    }
    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private productService: ProductService,
        private utilService: UtilService,
        private serviceService: ServiceService,
        private appointmentService: AppointmentService,
        private accountService: AccountService // private service: MessageService,
    ) {}

    ngOnInit(): void {}
}
