import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import {
    Appointment,
    Customer,
    Employee,
    Service,
    TokenObject,
} from 'src/app/models/models';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
    products: Product[] = [];
    dialog: Boolean = false;
    currentFilter: any = {};
    name: string = '';
    datejour: Date | null | undefined = null;
    sortOptions: SelectItem[] = [];
    statusOptions: SelectItem[] = [];
    routeItems!: MenuItem[];

    sortOrder: number = 0;
    date: any = '';
    availableProducts: Product[] = [];

    selectedProducts: Product[] = [];

    draggedProduct: Product | undefined | null = {};
    draggedProduct1: Product | undefined | null;
    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];
    filteredCustomers: any[] = [];
    orderCities: any[] = [];
    selectedCustomers: any[] = [];
    selectedServices: any[] = [];
    appointments: Appointment[] = [];
    draggedTodo: Appointment | null = {};
    draggedDo: Appointment | null = {};
    draggedDone: Appointment | null = {};
    appointTodo: Appointment[] = [];

    appointDo: Appointment[] = [];

    appointDone: Appointment[] = [];

    customers: Customer[] = [];
    services: Service[] = [];
    constructor(
        private productService: ProductService,
        private appointmentService: AppointmentService,
        private customersService: CustomerService,
        private serviceService: ServiceService,
        private uService: UtilService
    ) {}
    showService(appointment: Appointment) {
        let str = '';
        if (appointment.service != undefined)
            appointment.service.forEach((element) => {
                str += element.name + ' & \n ';
            });
        return str;
    }
    showDiag() {
        this.dialog = true;
    }
    format(date: any) {
        return this.uService.toDateFr(date);
    }
    filterByValue(val: Appointment[], value: any) {
        return val.filter((appointment) =>
            appointment.customer?.name
                ?.toLowerCase()
                .includes(value.toLowerCase())
        );
    }
    onSort(val: Appointment[]) {
        return val.sort(function (a, b) {
            let number = 0;
            if (a.date != undefined && b.date != undefined) {
                let un = new Date(a.date);
                let two = new Date(a.date);
                number = un.getTime() - two.getTime();
            }
            return number;
        });
    }
    getAppoints() {
        this.appointmentService.getAppointment('', { status: 0 }, (res) => {
            this.appointments = res;
            console.log(res);
        });
    }
    getAppointsStatus(status: number) {
        const json: Appointment = {};
        json.status = status;
        let string = '';
        if (this.datejour && this.datejour != undefined) {
            string += '?year=' + this.datejour.getFullYear();
            string += '&month=' + (this.datejour.getMonth() + 1);
            string += '&day=' + this.datejour.getDate();
        }
        this.appointmentService.getAppointment(
            string,
            { status: status },
            (res) => {
                if (status == 0) {
                    this.appointTodo = res;
                } else if (status == 1) {
                    this.appointDo = res;
                } else {
                    this.appointDone = res;
                }
            }
        );
    }
    setService() {
        this.serviceService.getService('', (res) => {
            this.services = res;
        });
    }
    setCustomer() {
        this.customersService.getCustomer('', (res) => {
            this.customers = res;
            console.log(this.customers);
        });
    }
    fetchAll() {
        this.getAppointsStatus(0);
        this.getAppointsStatus(1);
        this.getAppointsStatus(2);
    }
    ngOnInit() {
        this.setCustomer();
        this.setService();
        this.getAppoints();

        this.fetchAll();
        this.selectedProducts = [];
        this.availableProducts = [
            { id: '1', name: 'Black Watch' },
            { id: '2', name: 'Bamboo Watch' },
        ];
        this.sortOptions = [
            { label: 'Plus ancien', value: '!date' },
            { label: 'Plus recent', value: 'date' },
        ];
        this.statusOptions = [
            { label: 'Choisir', value: '-1' },
            { label: 'Nouveau', value: '0' },
            { label: 'En cours', value: '1' },
            { label: 'Fini', value: '2' },
        ];
        this.routeItems = [
            { label: 'Nouveau', routerLink: '/state/0' },
            { label: 'En cours', routerLink: '/state=1' },
            { label: 'Fini', routerLink: '/?state=2' },
        ];
    }
    findByStatus(val: Appointment[], value: any) {
        return val.filter((appointment) => appointment.status == value);
    }

    onStatusChange(event: any) {
        console.log('KKKKKKKKKK' + event.value);
        this.appointmentService.getAppointment(
            '',
            this.currentFilter,
            (res) => {
                if (event.value != -1) {
                    this.appointments = this.findByStatus(res, event.value);
                } else {
                    this.appointments = res;
                }
            }
        );
    }
    onSortChange(event: any) {
        // this.onSort(this.appointments);
        const value = event.value;
        // this.appointments = this.filterByValue('dina');
        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    hideDialog() {
        this.dialog = false;
    }
    changeDate(event: any) {
        console.log('1111111111111111' + this.datejour);

        this.fetchAll();
    }
    filterCustomer(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.customers.length; i++) {
            const country = this.customers[i];
            if (country?.name?.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(country);
            }
        }

        this.filteredCustomers = filtered;
    }

    filter() {
        const filter: any = {};
        filter.service = this.selectedServices;
        if (this.selectedCustomers.length != 0) {
            filter.customer = this.selectedCustomers;
        }
        // console.log("KKKKKKKKKKKKKKKKK"+this.selectedCustomers.length);
        filter.date = this.date;
        this.currentFilter = filter;

        this.appointmentService.getAppointment('', filter, (res) => {
            this.appointments = res;
            this.hideDialog();
        });
    }
    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    dragStart(product: any) {
        this.draggedProduct = product;
    }

    drop() {
        if (this.draggedProduct) {
            let draggedProductIndex = this.findIndex(this.draggedProduct);
            this.selectedProducts = [
                ...(this.selectedProducts as Product[]),
                this.draggedProduct,
            ];
            this.availableProducts = this.availableProducts?.filter(
                (val, i) => i != draggedProductIndex
            );
            this.draggedProduct = null;
        }
    }

    dragEndTodo() {
        this.draggedTodo = null;
        this.fetchAll();
    }
    dragStartTodo(appointment: Appointment | null) {
        this.draggedTodo = appointment;
    }
    dragEndDone() {
        this.draggedDone = null;
        this.fetchAll();
    }
    dragStartDone(appointment: Appointment | null) {
        this.draggedDone = appointment;
    }
    dragEndDo() {
        this.draggedDo = null;
        this.fetchAll();
    }

    dragStartDo(appointment: Appointment | null) {
        this.draggedDo = appointment;
    }
    getToken() {
        const token: TokenObject = this.uService.getToken();
        return token;
    }
    getEmp() {
        const token: TokenObject = this.getToken();
        const employee: Employee = {};
        employee._id = token.userId;
        return employee;
    }
    dropDo() {

        const emps: Employee = this.getEmp();
        if (this.draggedTodo?._id != undefined) {
            console.log(this.draggedTodo);
            this.appointmentService.patchAppointment(
                { status: 1, employee: emps },
                this.draggedTodo?._id,
                (res) => {}
            );
            this.fetchAll();
        } else if (this.draggedDone?._id != undefined) {
            this.appointmentService.patchAppointment(
                { status: 1, employee: emps },
                this.draggedDone?._id,
                (res) => {}
            );
            this.fetchAll();
        }
    }
    dropDone() {
        const emps: Employee = this.getEmp();
        if (this.draggedDo != undefined&&this.draggedDo?._id != undefined) {
            // console.log(this.draggedTodo);
            this.appointmentService.patchAppointment(
                { status: 2, employee: emps },
                this.draggedDo?._id,
                (res) => {}
            );
            this.fetchAll();
        }
    }

    dropTodo() {
        const emps: Employee = this.getEmp();
        if (this.draggedDo != undefined) {
            this.appointmentService.patchAppointment(
                { status: 0, employee: emps },
                this.draggedDo?._id,
                (res) => {}
            );
            this.fetchAll();
        }
    }
    dragEnd1() {
        this.draggedProduct1 = null;
    }
    dragStart1(product: Product | null | undefined) {
        this.draggedProduct1 = product;
        console.log(product);
    }

    drop1() {
        if (this.draggedProduct) {
            let draggedProductIndex = this.findIndex1(this.draggedProduct);
            this.availableProducts = [
                ...(this.availableProducts as Product[]),
                this.draggedProduct,
            ];
            this.selectedProducts = this.selectedProducts?.filter(
                (val, i) => i != draggedProductIndex
            );
            this.draggedProduct = null;
        }
    }
    dropAll(
        sourceList: Product[],
        targetList: Product[],
        draggedProduct: Product | null | undefined
    ) {
        if (sourceList != undefined && draggedProduct != undefined) {
            // if (this.draggedProduct)
            {
                console.log(sourceList.length);
                // sourceList.forEach(element => {
                //     console.log(element);
                // });
                // console.log(sourceList+"111<<<");

                let draggedProductIndex = this.findIndexInSource(
                    draggedProduct,
                    sourceList
                );

                targetList = [...(targetList as Product[]), draggedProduct];
                // console.log("..."+targetList.length+"...");

                sourceList = sourceList?.filter(
                    (val, i) => i != draggedProductIndex
                );
            }
        }
    }

    dragEnd() {
        this.draggedProduct = null;
    }

    findIndexInSource(product: Product, sourceList: Product[]) {
        let index = -1;
        for (let i = 0; i < (sourceList as Product[]).length; i++) {
            if (product.id === (sourceList as Product[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findIndex(product: Product) {
        let index = -1;
        for (let i = 0; i < (this.availableProducts as Product[]).length; i++) {
            if (product.id === (this.availableProducts as Product[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findIndex1(product: Product) {
        let index = -1;
        for (let i = 0; i < (this.selectedProducts as Product[]).length; i++) {
            if (product.id === (this.selectedProducts as Product[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
