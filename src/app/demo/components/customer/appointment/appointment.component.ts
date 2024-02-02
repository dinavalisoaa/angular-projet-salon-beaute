import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Appointment, Service,Customer } from 'src/app/models/models';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { ServiceService } from 'src/app/service/service/service.service';

@Component({
    templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit {

    products: Product[] = [];
    appointment: Appointment = {};

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    allServices: Service[] = [];

    servicesToDo: Service[] = [];

    orderCities: any[] = [];

    constructor(private productService: ProductService, private serviceService: ServiceService,
        appointmentService:AppointmentService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.serviceService.getService("",(res) => {
            this.allServices = res;
        });
        // this.allServices = [
        //     { name: 'Manicure', code: 'SF' },
        //     { name: 'Pedicure', code: 'LDN' },
        //     { name: 'Lissage', code: 'PRS' },
        //     { name: 'Soin du visage', code: 'IST' },
        //     { name: 'Traitement capillaire', code: 'BRL' },
        //     { name: 'Coloration', code: 'BRC' },
        //     { name: 'Extension cheveux', code: 'RM' }];

        this.servicesToDo = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }
    saveAppointment(){
        // const {}=;
        const customer: Customer = {
           
        };
     //   customer.address
        const data: Appointment = {
           
        };
        data.date=this.appointment.date;
        data.service=this.servicesToDo;
        data.customer=new Customer();
        // this.appointmentService.getProducts().then(data => this.products = data);
        
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
