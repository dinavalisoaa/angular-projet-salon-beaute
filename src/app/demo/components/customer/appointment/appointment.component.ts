import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import {
    Appointment,
    Service,
    Customer,
    TokenObject,
    Account,
} from 'src/app/models/models';
import { AccountService } from 'src/app/service/account/account.service';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    templateUrl: './appointment.component.html',
    providers: [MessageService],
})
export class AppointmentComponent implements OnInit {
    products: Product[] = [];
    appointment: Appointment = {};
    filledAppointment: Appointment = {};
    visiblePay: boolean = false;
    show: boolean = false;

    routeItems!: MenuItem[];

    sortOptions: SelectItem[] = [];
    amount: number = 0;
    sortOrder: number = 0;
    total: number = 0;
    state: string = '';
    message: string = '';

    sortField: string = '';

    allServices: Service[] = [];

    servicesToDo: Service[] = [];

    orderCities: any[] = [];

    constructor(
        private productService: ProductService,
        private utilService: UtilService,
        private serviceService: ServiceService,
        private appointmentService: AppointmentService,
        private accountService: AccountService,
        private service: MessageService,
        private customerService: CustomerService
    ) {}
    fetchService() {
        this.serviceService.getService('', (res) => {
            this.allServices = res;
        });
    }
    ngOnInit() {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.fetchService();

        this.servicesToDo = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' },
        ];
    }
    totalize() {
        let sum = 0;
        this.servicesToDo.forEach((element) => {
            if (element.price != undefined) {
                sum += element.price;
            }
        });
        return sum;
    }
    pay() {
        const token: TokenObject = this.utilService.getToken();
        const account: Account = {};
        account.customer = token.info;
        account.date = new Date();
        account.description = '';
        account.debit = this.total;
        account.credit = 0;
        this.accountService.saveAccount(account, (res) => {
            console.log(res);
        });
        this.appointmentService.saveAppointment(
            this.filledAppointment,
            (res) => {
                // if(res.status==4)
                // console.log(res);
            }
        );
        this.servicesToDo = [];
        this.fetchService();

        this.visiblePay = false;
        this.appointment = {};
    }
    saveAppointment() {
        const data: Appointment = {};
        data.date = this.appointment.date;
        const token: TokenObject = this.utilService.getToken();
        data.customer = token.info;
        data.service = this.servicesToDo;
        data.status = 0;
        this.filledAppointment = data;
        this.visiblePay = true;
        this.total = this.totalize();
        let account = 0;
        this.accountService.getAccountState(token.info._id, (res) => {
            account = res[0].total_credit - res[0].total_debit;
            this.state = this.utilService.formatted(account);
            if (account < this.total) {
                // this.show = true;
            }
        });

        const data2 = {
            date: {
                day: '9',
                month: '2',
                hour: '09',
                minute: '47',
            },
            shipper: 'BEAUTY SALON',
            recipient: 'lalaina.nancia64@gmail.com',
            subject: "Rappel d'un rendez-vous",
            message:
                'Bonjour,  Nous voulions simplement vous rappeler que vous avez un rendez-vous pour votre séance de beauté demain à la meme heure',
        };
        this.customerService.sendScheduledEmail(data2, (res) => {
            console.log(data2);
        });
    }
    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
}
