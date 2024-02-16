import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from 'src/app/demo/service/country.service';
import { Employee, Service, Sex, TokenObject } from 'src/app/models/models';
import { EmployeeService } from 'src/app/service/employee/employee.service';
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

    emp: Employee = {};

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
        private empService: EmployeeService
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
        const id = this.getEmp()._id;
        const name = this.emp.name;
        const profile = this.emp.profile;
        const firstname = this.emp.firstname;
        const dateOfBirth = this.emp.dateOfBirth;
        const sex = this.emp.sex;
        const address = this.emp.address;
        const phoneNumber = this.emp.phoneNumber;
        const email = this.emp.email;
        const password = this.emp.password;
        const schedule = { entry: this.entry, exit: this.exit };
        const data: Employee = {
            name,
            firstname,
            profile,
            dateOfBirth,
            sex,
            address,
            phoneNumber,
            email,
            password,
            schedule,
        };
        this.empService.updatePersonnel(data, id, () => {
            Swal.fire({
                icon: 'success',
                title: 'Message',
                text: 'Modication effectuer',
                footer: '',
            });
            this.fetchEmp();
        });
        // this.editempDialog = false;
        // this.emp = {};
    }
    fetchEmp(){
        this.empService.getOneEmployee(this.getToken().userId, (res) => {
            this.emp = res;
            this.entry = this.uService.getTimeFromDate(
                this.emp.schedule?.entry
            );
            this.exit = this.uService.getTimeFromDate(this.emp.schedule?.exit);
        });
    }
    ngOnInit() {
        this.sexService.getAllSexes((res) => {
            this.sexItem = res;
        });
        this.fetchEmp();
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }
    getToken() {
        const token: TokenObject = this.uService.getToken();
        return token;
    }
    getEmp() {
        const token: TokenObject = this.getToken();
        let employee: Employee = {};
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
