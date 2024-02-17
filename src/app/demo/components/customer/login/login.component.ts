import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { registry } from 'chart.js';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Customer, Manager } from 'src/app/models/models';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ManagerService } from 'src/app/service/manager/manager.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    selector: 'app-login-customer',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    // valCheck: string[] = ['remember'];
    password: string = 'root';
    email: string = 'randriamifidydina@gmail.com';

    constructor(
        public layoutService: LayoutService,
        public customerService: CustomerService,
        public utilService: UtilService,
        private route: ActivatedRoute,
        public router: Router
    ) {}

    login() {
        const password = this.password;
        const email = this.email;
        const data: Customer = {
            password,
            email,
        };
        this.customerService.loginCustomer(data, (res) => {
            // alert( this.route.snapshot.queryParams['after']);
            if (this.route.snapshot.queryParams['after'] != undefined) {
                this.utilService.navigateTo(
                    this.route.snapshot.queryParams['after']
                );
                return;
            } else {
                // console.log(this.utilService.getToken());
                this.utilService.navigateTo('/customer/appointment/making');
            }
        });
    }
}
