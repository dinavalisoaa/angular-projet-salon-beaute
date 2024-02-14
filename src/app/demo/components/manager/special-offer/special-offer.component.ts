import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { SpecialOfferService } from 'src/app/service/special-offer/special-offer.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    selector: 'app-special-offer',
    templateUrl: './special-offer.component.html',
    providers: [MessageService],
    styles: [`
        .offer-card:hover {
            background-color: #ffffbf;
        }
    `]
})
export class SpecialOfferComponent implements OnInit {

    specialOffers: [] = [];

    specialOffer: any = {};

    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    newDialog: boolean = false;

    submitted: boolean = false;

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private specialOfferService: SpecialOfferService,
        public utilService: UtilService
    ) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.fetchSpecialOffer();

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.targetCities = [];

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

    fetchSpecialOffer() {
        this.specialOfferService.getSpecialOffers((res) => {
            console.log(res);
            this.specialOffers = res;
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

    openNewDialog() {
        this.specialOffer = {};
        this.submitted = false;
        this.newDialog = true;
    }

    saveSpecialOffer() {
        console.log(this.utilService.getToken().userId);
        const sender = this.utilService.getToken().userId;
        const launchDate = this.utilService.addToDate(new Date(this.specialOffer.launchDate), 3);
        const message = this.specialOffer.message;
        const expirationDate = this.utilService.addToDate(new Date(this.specialOffer.expirationDate), 3);
        const data: any = {
            sender,
            launchDate,
            message,
            expirationDate
        };
        this.submitted = true;
        console.log(data);
        this.specialOfferService.saveSpecialOffer(data, () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Lancement réussi',
                detail: 'Nouvel offre spécial lancé',
                life: 5000,
            });
            this.fetchSpecialOffer();
        });
        this.newDialog = false;
        this.specialOffer = {};
    }

    hideDialog() {
        this.newDialog = false;
        this.submitted = false;
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
}
