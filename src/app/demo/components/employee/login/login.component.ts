import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Employee } from 'src/app/models/models';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    selector: 'app-login-employee',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    // valCheck: string[] = ['remember'];
    password: string = 'dina';
    email: string = 'dina@gmail.com';

    constructor(
        public layoutService: LayoutService,
        public employeeService: EmployeeService,
        public utilService: UtilService,
        public router: Router
    ) {}
    login() {
        const password = this.password;
        const email = this.email;
        const data: Employee = {
            password,
            email,
        };
        this.employeeService.loginEmployee(data, (res) => {
            console.log(this.utilService.getToken());
            this.utilService.navigateTo('/employee/task');
        });
    }
}
