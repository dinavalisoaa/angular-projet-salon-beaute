import { Component, Input, OnInit } from '@angular/core';
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
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
    selector: 'my-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    datejour: Date | null | undefined = new Date();
    successIcon: string = 'pi-check';
    loadIcon: string = 'pi-clock';
    beginIcon: string = 'pi-times';
    products: Product[] = [];
    dialog: Boolean = false;
    currentFilter: any = {};
    name: string = '';

    commission: any;
    taskDate: any = new Date();

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
        private appointmentService: AppointmentService,
        private customersService: CustomerService,
        private serviceService: ServiceService,
        public uService: UtilService,
        private route: ActivatedRoute,
        private employeeService: EmployeeService
    ) {}

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
        if (status != 0) {
            json.employee = this.getEmp();
        }
        let string = '';
        if (this.datejour && this.datejour != undefined) {
            string += '?year=' + this.datejour.getFullYear();
            string += '&month=' + (this.datejour.getMonth() + 1);
            string += '&day=' + this.datejour.getDate();
        }
        this.appointmentService.getAppointment(string, json, (res) => {
            if (status == 0) {
                this.appointTodo = res;
            } else if (status == 1) {
                this.appointDo = res;
            } else {
                this.appointDone = res;
            }
        });
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
        if (this.route.snapshot.queryParams['date'] != null) {
            this.datejour =new Date( this.route.snapshot.queryParams['date']);
        }

        // this.id =
        // Swal.fire();
        this.setCustomer();
        this.setService();
        this.getAppoints();
        this.setCommission();

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

    setCommission() {
        const employeeId = this.uService.getToken().userId;
        const date = this.taskDate;
        const data = {
            date
        }
        this.employeeService.getCommission(employeeId, data, (res) => {
            this.commission = res.total;
        });
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
        this.fetchAll();
        this.taskDate = event;
        this.setCommission();
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
                (res) => {
                    this.fetchAll();
                }
            );
            this.fetchAll();
        } else if (this.draggedDone?._id != undefined) {
            this.appointmentService.patchAppointment(
                { status: 1, employee: emps },
                this.draggedDone?._id,
                (res) => {
                    this.fetchAll();
                }
            );
        }
    }
    dropDone() {
        const emps: Employee = this.getEmp();
        if (this.draggedDo != undefined && this.draggedDo?._id != undefined) {
            // console.log(this.draggedTodo);
            this.appointmentService.patchAppointment(
                { status: 2, employee: emps },
                this.draggedDo?._id,
                (res) => {
                    this.fetchAll();
                }
            );
        }
    }

    dropTodo() {
        const emps: Employee = this.getEmp();
        if (this.draggedDo != undefined) {
            this.appointmentService.patchAppointment(
                { status: 0, employee: null },
                this.draggedDo?._id,
                (res) => {
                    this.fetchAll();
                }
            );
        }
    }
}
