import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { AccountService } from 'src/app/service/account/account.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { Account, Appointment, Service } from 'src/app/models/models';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { DataView } from 'primeng/dataview';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-create-appointment',
    templateUrl: './create-appointment.component.html',
    providers: [MessageService, ConfirmationService],
    styles: [
        `
            :host ::ng-deep .p-frozen-column {
                font-weight: bold;
            }

            :host ::ng-deep .p-datatable-frozen-tbody {
                font-weight: bold;
            }

            :host ::ng-deep .p-progressbar {
                height: 0.5rem;
            }
        `,
    ],
})
export class CreateAppointmentComponent implements OnInit {
    appointment: Appointment = {};
    date: Date = new Date();
    filledAppointment: Appointment = {};
    display: boolean = false;
    allServices: Service[] = [];

    servicesToDo: Service[] = [];
    // service:Service={};
    click(service: Service) {
        console.log('.............');
        // Swal.fire(service.toString());
    }
    saveService(service: Service) {
        if (!this.servicesToDo.includes(service)) {
            this.servicesToDo.push(service);
        }
    }
    choose() {
        this.display=true;
    }
    trashService(service: Service) {
        let index = this.servicesToDo.indexOf(service);
        if (this.servicesToDo.length > 1) {
            this.servicesToDo.splice(index, index);
        } else {
            this.servicesToDo.pop();
        }
        // Swal.fire(.toString());
        // ;
    }
    saveAppointment() {}
    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private productService: ProductService,
        private utilService: UtilService,
        private serviceService: ServiceService,
        private appointmentService: AppointmentService,
        private accountService: AccountService,
        // private service: MessageService,
        private customerService: CustomerService
    ) {}
    format(date: any) {
        return this.utilService.toDateFr(date);
    }
    fetchService() {
        this.serviceService.getService('', (res) => {
            this.allServices = res;
            console.log(this.allServices);
        });
    }
    ngOnInit() {
        this.fetchService();

        this.servicesToDo = [];
    }
}
