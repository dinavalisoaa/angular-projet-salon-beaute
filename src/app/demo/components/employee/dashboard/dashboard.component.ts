import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { ManagerService } from 'src/app/service/manager/manager.service';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { TokenObject, Employee, Appointment } from 'src/app/models/models';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    currentDate: any = new Date();

    months: [] = [];

    sales: [] = [];

    expenses: [] = [];

    profits: [] = [];

    totalAmount: any = {};

    dailySales: any;

    items!: MenuItem[];

    products!: Product[];
    appointment: Appointment[] = [];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    date: any = new Date();

    year: any = new Date();
    qtyDo: any;

    qtyTodo: any;

    qtyDone: any;
    getEmp() {
        const token: TokenObject = this.getToken();
        let employee: Employee = {};
        employee = token.info;
        return employee;
    }
    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        public utilService: UtilService,
        private managerService: ManagerService,
        public appointService: AppointmentService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(
            () => {}
        );
    }
    getToken() {
        const token: TokenObject = this.utilService.getToken();
        return token;
    }
    ngOnInit() {
        this.fetchTotalAmount();
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
        this.appointService.getAppointmentByEmp(this.getEmp()._id, (res) => {
            console.log(res);
            this.appointment = res;
            this.qtyDo = this.appointment.filter(
                (val, index) => val.status == 1
            ).length;
            this.qtyDone = this.appointment.filter(
                (val, index) => val.status == 2
            ).length;
            this.qtyTodo = this.appointment.filter(
                (val, index) => val.status == 0
            ).length;
        });
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
    }

    fetchTotalAmount() {
        this.managerService.getTotalAmount((res) => {
            this.totalAmount = res;
        });
    }

    getDailySales(event: any) {
        const date = event;
        const data = {
            date,
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
