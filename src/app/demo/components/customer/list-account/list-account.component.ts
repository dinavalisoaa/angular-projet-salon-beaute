import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { AccountService } from 'src/app/service/account/account.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { Account } from 'src/app/models/models';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'list-account',
    templateUrl: './list-account.component.html',
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
export class ListAccountComponent implements OnInit {
    moves: Account[] = [];
    reload:boolean=false;
    credit: number = 0;
    debit: number = 0;

    @ViewChild('filter') filter!: ElementRef;
    services: any[] = [];

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private uService: UtilService,
        private accountService: AccountService,

    ) {}

    ngOnInit() {
        let sumC = 0;
        let sumD = 0;

        this.accountService.getAccount('', (res) => {
            this.moves = res;
            this.moves.forEach((element) => {
                if (element.credit != undefined && element.debit != undefined) {
                    sumC += element.credit;
                    sumD += element.debit;
                }
            });
            this.credit = sumC;
            this.debit = sumD;
        });
    }

    onSort() {}

    formatCurrency(value: number) {
        return value.toLocaleString('en-FR', {
            style: 'currency',
            currency: 'EUR',
        });
    }
}
