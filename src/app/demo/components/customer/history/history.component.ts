import { CustomerService } from 'src/app/service/customer/customer.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { UtilService } from 'src/app/service/util-service/util.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './history.component.html',
    providers: [MessageService, ConfirmationService],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class HistoryComponent implements OnInit {

    histories: [] = [];

    expandedRows: expandedRows = {};

    showDetails: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private productService: ProductService,
        private customerService: CustomerService,
        public utilService: UtilService
    ) { }

    ngOnInit() {
        this.fetchHistory();
    }

    fetchHistory() {
        const customerId = this.utilService.getToken().info._id;
        this.customerService.getAppointmentHistory( customerId, (res) => {
            this.histories = res;
        });
    }

    checkStatus(status: number) {
        let res: { type: any, message: string } = { type: "danger", message: "Pas fini" };
        if(status == 1){
            res = { type: "warning", message: "En traitement" };
        }
        else if(status == 2){
            res = { type: "success", message: "Achevé" };
        }
        return res;
    }

    showAddDetails() {
        if (!this.showDetails) {
            // this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');
            this.histories.forEach(history => history ? this.expandedRows[history] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.showDetails = !this.showDetails;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
