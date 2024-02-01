import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Service } from 'src/app/models/models';
import { ServiceService } from 'src/app/service/service.service';

@Component({
    templateUrl: './service-crud.component.html',
    providers: [MessageService],
})
export class ServiceCrudComponent implements OnInit {
    serviceDialog: boolean = false;

    filtreDialog: boolean = false;

    deleteServiceDialog: boolean = false;

    deleteServicesDialog: boolean = false;

    services: Service[] = [];

    service: Service = {};

    selectedServices: Service[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private serviceService: ServiceService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.fetchList();

        // this.serviceService.getServices().then(data => );
        // console.log(this.services)
        this.cols = [
            { field: 'service', header: 'Service' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];
    }
    myUploader(event: any, service?: any) {
        console.log('onUpload() START');

        for (let file of event.files) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                //   console.log(reader.result);
                service.illustration = reader.result;
                //   =reader.result;
            };
            console.log('FILE TO BE UPLOADED: ', file);
            //   this.uploadedFiles.push(file);
        }
        // this.service.illustration=
        this.messageService.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: '',
        });
    }
    openNew() {
        this.service = {};
        this.submitted = false;
        this.serviceDialog = true;
    }

    deleteSelectedServices() {
        this.deleteServicesDialog = true;
    }

    editService(service: Service) {
        this.service = { ...service };
        this.serviceDialog = true;
    }

    deleteService(service: Service) {
        this.deleteServiceDialog = true;
        this.service = { ...service };
    }

    confirmDeleteSelected() {
        this.deleteServicesDialog = false;
        this.services = this.services.filter(
            (val) => !this.selectedServices.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Services Deleted',
            life: 3000,
        });
        this.selectedServices = [];
    }

    confirmDelete() {
        this.deleteServiceDialog = false;
        this.services = this.services.filter(
            (val) => val._id !== this.service._id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Service Deleted',
            life: 3000,
        });
        this.service = {};
    }

    hideDialog() {
        this.serviceDialog = false;
        this.submitted = false;
    }
    fetchList() {
        this.serviceService.getService((res) => {
            this.services = res;
        });
    }

    saveService() {
        const commission = this.service.commission;
        const duration = this.service.duration;
        const name = this.service.name;
        const price = this.service.price;
        const illustration = this.service.illustration;
        const data: Service = {
            name,
            price,
            commission,
            duration,
            illustration,
        };

        if (this.service._id == undefined) {
            this.submitted = true;
            console.log(data);
            this.serviceService.saveService(data, () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Service Created',
                    life: 3000,
                });
                this.fetchList();
            });
        } else {
            this.serviceService.updateService(data, this.service._id, () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Service Updated',
                    life: 3000,
                });
                this.fetchList();
            });
        }
        this.serviceDialog = false;
        this.service = {};
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.services.length; i++) {
            if (this.services[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
