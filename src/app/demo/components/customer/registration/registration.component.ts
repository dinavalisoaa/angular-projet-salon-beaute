import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SexService } from 'src/app/service/sex/sex.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registration-customer',
    templateUrl: './registration.component.html',
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
export class RegistrationComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    selectedState: any;

    dropdownItems = [
        { name: 'Homme', code: 'Homme' },
        { name: 'Femme', code: 'Femme' }
    ];

    selectedSex: any;

    dropdownSexes: [] = [];

    customer: any = {};

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private sexService: SexService,
        private customerService: CustomerService,
        private utilService: UtilService
    ) { }

    ngOnInit() {
        this.fetchSexes();
    }

    fetchSexes() {
        this.sexService.getAllSexes((res) => {
            this.dropdownSexes = res;
            console.log(res);
        });
    }

    registration() {
        const name = this.customer.name;
        const firstname = this.customer.firstname;
        const dateOfBirth = this.customer.dateOfBirth;
        const sex = this.selectedSex._id;
        const address = this.customer.address;
        const phoneNumber = this.customer.phoneNumber;
        const email = this.customer.email;
        const password = this.customer.password;
        const confirmationPassword = this.customer.confirmationPassword;
         const data: any = {
            name,
            firstname,
            dateOfBirth,
            sex,
            address,
            phoneNumber,
            email,
            password,
            confirmationPassword
        };
        console.log(data);
        this.customerService.registration(data, () => {
            this.customerService.loginCustomer( { password, email }, (res) => {
                Swal.fire({
                    icon: "success",
                    title: "Inscription réussi",
                    text: 'Vous êtes désormais inscrit sur Beauty Salon'
                });
                this.utilService.navigateTo('/customer/appointment/making');
            });
        });
    }
}
