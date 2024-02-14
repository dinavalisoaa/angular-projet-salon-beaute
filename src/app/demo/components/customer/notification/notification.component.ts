import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    templateUrl: './notification.component.html',
    providers: [MessageService],
    styles: [`
        .offer-card:hover {
            background-color: #EFEFEF;
            // transform: scale(1.01)
        }
    `]
})
export class NotificationComponent implements OnInit {

    hasNewNotifications: boolean = false;

    notifications: any = {};

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
        private notificationService: NotificationService,
        public utilService: UtilService
    ) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.fetchNotifications();

        this.markAllAsRead();

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

    fetchNotifications() {
        const userId = this.utilService.getToken().info._id;
        this.notificationService.getNotifications(userId, (res) => {
            console.log(res);
            this.notifications = res;
        });
    }

    markAllAsRead() {
        const userId = this.utilService.getToken().info._id;
        this.notificationService.markAllAsRead(userId, (res) => {
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

    hideDialog() {
        this.newDialog = false;
        this.submitted = false;
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
}
