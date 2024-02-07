import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './preference.component.html',
    providers: [MessageService]
})
export class PreferenceComponent implements OnInit {

    services: [] = [];

    employees: [] = [];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private photoService: PhotoService,
        private serviceService: ServiceService,
        private customerService: CustomerService,
        public utilService: UtilService
    ) { }

    ngOnInit() {
        this.fetchService();
        this.fetchEmployee();
    }

    fetchService() {
        const customerId = this.utilService.getToken().info._id;
        this.customerService.getCustomerServices( customerId, (res) => {
            this.services = res;
        });
    }

    fetchEmployee() {
        const customerId = this.utilService.getToken().info._id;
        this.customerService.getCustomerEmployees( customerId, (res) => {
            this.employees = res;
        });
    }

    choosePreferenceService( serviceId: any, isPreferred: boolean) {
        const customerId = this.utilService.getToken().info._id;
        const data = {
            serviceId: serviceId,
            isPreferred: isPreferred
        };
        this.customerService.choosePreferredService(data, customerId, (res) => {
            if(data.isPreferred) {
                console.log(true);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Préférence service',
                    detail: 'Service ajouté dans la liste des préférences',
                    life: 5000,
                });
            }
            else{
                console.log(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Préférence service annulé',
                    detail: 'Service retiré de la liste des préférences',
                    life: 5000,
                });
            }
            this.fetchService();
        });
    }

    choosePreferenceEmployee( employeeId: any, isPreferred: boolean) {
        const customerId = this.utilService.getToken().info._id;
        const data = {
            employeeId: employeeId,
            isPreferred: isPreferred
        };
        this.customerService.choosePreferredEmployee(data, customerId, (res) => {
            if(data.isPreferred) {
                console.log(true);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Préférence employé',
                    detail: 'Employé ajouté dans la liste des préférences',
                    life: 5000,
                });
            }
            else{
                console.log(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Préférence employé annulé',
                    detail: 'Employé retiré de la liste des préférences',
                    life: 5000,
                });
            }
            this.fetchEmployee();
        });
    }
}
