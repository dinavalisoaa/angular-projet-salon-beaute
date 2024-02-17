import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from 'src/app/demo/service/country.service';
import { Customer, Service, Sex, TokenObject } from 'src/app/models/models';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { SexService } from 'src/app/service/sex/sex.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './profile.component.html',
    providers: [MessageService],
})
export class ProfileComponent implements OnInit {
    countries: any[] = [];
    password: string = '';
    emp: Customer = {};

    cities: any[];

    filteredCountries: any[] = [];

    value1: any;

    value2: any;

    value3: any;

    value4: any;
    label: string = 'Changer la photo';
    labelChoose: string = 'Choisir';
    value5: any;

    value6: any;

    value7: any;

    value8: any;

    value9: any;

    value10: any;

    value11: any;

    value12: any;
    sexItem: Sex[] = [];
    entry: any;
    exit: any;
    getDate(date: any) {
        return date.toString().split('T')[0];
    }
    constructor(
        private countryService: CountryService,
        private uService: UtilService,
        private sexService: SexService,
        private empService: CustomerService
    ) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }
    editempInformation(event: any) {
        const id = this.getCust()._id;
        const name = this.emp.name;
        const profile = this.emp.profile;
        const firstname = this.emp.firstname;
        const dateOfBirth = this.emp.dateOfBirth;
        const sex = this.emp.sex;
        const address = this.emp.address;
        const phoneNumber = this.emp.phoneNumber;
        const email = this.emp.email;
        const password = this.password;
        const data: Customer = {
            name,
            firstname,
            profile,
            dateOfBirth,
            sex,
            address,
            phoneNumber,
            email,
        };
        if (this.password != '') {
            data.password = this.password;
        }
        // Swal.fire(JSON.stringify(data));
        this.empService.updateCustomer(data, id, () => {
            Swal.fire({
                icon: 'success',
                title: 'Message',
                text: 'Modication effectuer',
                footer: '',
            });
            this.fetchCust();
        });
        // this.editempDialog = false;
        // this.emp = {};
    }
    fetchCust() {
        this.empService.getOneCustomer(this.getToken().userId, (res) => {
            this.emp = res;
            // Swal.fire(this.getToken().userId);
            // this.exit = this.uService.getTimeFromDate(this.emp.schedule?.exit);
        });
    }
    ngOnInit() {
        this.sexService.getAllSexes((res) => {
            this.sexItem = res;
        });
        this.fetchCust();
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }
    getToken() {
        const token: TokenObject = this.uService.getToken();
        return token;
    }
    getCust() {
        const token: TokenObject = this.getToken();
        let employee: Customer = {};
        employee = token.info;
        return employee;
    }

    myUploader(event: any, service?: any) {
        for (let file of event.files) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                service.profile = reader.result;
                console.log(service.profile);
            };
        }
    }
}
