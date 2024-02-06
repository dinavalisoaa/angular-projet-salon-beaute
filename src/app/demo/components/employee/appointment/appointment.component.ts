import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Appointment } from 'src/app/models/models';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';

@Component({
    templateUrl: './appointment.component.html',
    providers: [MessageService],
})
export class AppointmentComponent implements OnInit {
    expenseDialog: boolean = false;

    filtreDialog: boolean = false;

    deleteAppointmentDialog: boolean = false;

    deleteAppointmentsDialog: boolean = false;

    expenses: Appointment[] = [];

    expense: Appointment = {};

    selectedAppointments: Appointment[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private expenseAppointment: AppointmentService,
        private messageAppointment: MessageService
    ) {}

    ngOnInit() {
        this.fetchList('');

        // this.expenseAppointment.getAppointments().then(data => );
        // console.log(this.expenses)
    }
    myUploader(event: any, expense?: any) {
        console.log('onUpload() START');

        for (let file of event.files) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                expense.illustration = reader.result;
            };
            console.log('FILE TO BE UPLOADED: ', file);
            //   this.uploadedFiles.push(file);
        }
        // this.expense.illustration=
        this.messageAppointment.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: '',
        });
    }
    openNew() {
        this.expense = {};
        this.submitted = false;
        this.expenseDialog = true;
    }

    deleteSelectedAppointments() {
        this.deleteAppointmentsDialog = true;
    }

    editAppointment(expense: Appointment) {
        this.expense = { ...expense };
        this.expenseDialog = true;
    }

    deleteAppointment(expense: Appointment) {
        this.deleteAppointmentDialog = true;
        this.expense = { ...expense };
    }

    confirmDeleteSelected() {
        this.deleteAppointmentsDialog = false;
        this.expenses = this.expenses.filter(
            (val) => !this.selectedAppointments.includes(val)
        );
        this.messageAppointment.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointments Deleted',
            life: 3000,
        });
        this.selectedAppointments = [];
    }

    confirmDelete() {
        this.deleteAppointmentDialog = false;
        this.expenses = this.expenses.filter(
            (val) => val._id !== this.expense._id
        );
        this.messageAppointment.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointment Deleted',
            life: 3000,
        });
        this.expense = {};
    }

    hideDialog() {
        this.expenseDialog = false;
        this.submitted = false;
        this.filtreDialog = false;
    }

    showDialogFilter() {
        this.filtreDialog = true;
    }
    fetchList(query: string) {
        this.expenseAppointment.getAppointment(query, (res) => {
            this.expenses = res;
        });
    }
    search() {
        var query: any = '?';
        const data: Appointment = {};
        if (this.expense.amount) {
            query += '&amount=' + this.expense.amount;
        }
        if (this.expense.date) {
            query += '&date=' + this.expense.date;
        }
        if (this.expense.description) {
            query += '&description=' + this.expense.description;
        }
        console.log(query);
        this.fetchList(query);
        this.filtreDialog = false;
    }
    resetFilter() {
        this.expense = {};
    }
    saveAppointment() {
        const date = this.expense.date;
        const description = this.expense.description;
        const amount = this.expense.amount;
        const data: Appointment = {
            description,
            amount,
            date,
        };

        if (this.expense._id == undefined) {
            this.submitted = true;
            console.log(data);
            this.expenseAppointment.saveAppointment(data, () => {
                this.messageAppointment.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Created',
                    life: 3000,
                });
                this.fetchList('');
            });
        } else {
            this.expenseAppointment.updateAppointment(data, this.expense._id, () => {
                this.messageAppointment.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Updated',
                    life: 3000,
                });
                this.fetchList('');
            });
        }
        this.expenseDialog = false;
        this.expense = {};
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i]._id === id) {
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
