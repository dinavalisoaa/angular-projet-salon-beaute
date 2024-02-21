import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { ManagerService } from 'src/app/service/manager/manager.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    currentDate: any = new Date();

    months: [] = [];

    sales: [] = [];

    expenses: [] = [];

    profits: [] = [];

    totalAmount: any = {}

    dailySales: any;

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    date: any = new Date();

    year: any = new Date();

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        public utilService: UtilService,
        private managerService: ManagerService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.fetchTotalAmount();
        this.getDailySales(null);
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        this.managerService.getFinancialReview(this.year.getFullYear() ,(res) => {
            this.months = res.map((item: { month: { abbreviation: any; }; }) => item.month.abbreviation);
            this.sales = res.map((item: { sales: any }) => item.sales);
            this.expenses = res.map((item: { expenses: any }) => item.expenses);
            this.profits = res.map((item: { profits: any }) => item.profits);

            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.chartData = {
                labels: this.months,
                datasets: [
                    {
                        label: 'Chiffre d\'affaires',
                        data: this.sales,
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--gray-600'),
                        borderColor: documentStyle.getPropertyValue('--gray-600'),
                        tension: .4
                    },
                    {
                        label: 'Bénéfices',
                        data: this.profits,
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--green-600'),
                        borderColor: documentStyle.getPropertyValue('--green-600'),
                        tension: .4
                    },
                    {
                        label: 'Dépenses',
                        data: this.expenses,
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--red-600'),
                        borderColor: documentStyle.getPropertyValue('--red-600'),
                        tension: .4
                    }
                ]
            };

            this.chartOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
        });
    }

    fetchTotalAmount() {
        this.managerService.getTotalAmount((res) => {
            this.totalAmount = res;
        });
    }

    getDailySales(event: any) {
        const date = event;
        const data = {
            date
        };
        console.log(event);
        this.managerService.getDailySales(data, (res) => {
            this.dailySales = res;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
