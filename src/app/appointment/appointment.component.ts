import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Appointment,Customer } from 'src/app/models/models';

@Component({
    templateUrl: './appointment.component.html',
    providers: [MessageService],
})
export class AppointmentComponent implements OnInit {
    appointmentDialog: boolean = false;

    filtreDialog: boolean = false;

    deleteAppointmentDialog: boolean = false;

    deleteAppointmentsDialog: boolean = false;
    customerAppointment: Customer ={};
    appointments: Appointment[] = [];

    appointment: Appointment ={};

    selectedAppointments: Appointment[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private appointmentAppointment: AppointmentService,
        private messageAppointment: MessageService
    ) {}

    ngOnInit() {
        this.fetchList('');

        // this.appointmentAppointment.getAppointments().then(data => );
        // console.log(this.appointments)
    }
    myUploader(event: any, appointment?: any) {
        console.log('onUpload() START');

        for (let file of event.files) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                appointment.illustration = reader.result;
            };
            console.log('FILE TO BE UPLOADED: ', file);
            //   this.uploadedFiles.push(file);
        }
        // this.appointment.illustration=
        this.messageAppointment.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: '',
        });
    }
    openNew() {
        this.appointment = {};
        this.submitted = false;
        this.appointmentDialog = true;
    }

    deleteSelectedAppointments() {
        this.deleteAppointmentsDialog = true;
    }

    editAppointment(appointment: Appointment) {
        this.appointment = { ...appointment };
        this.appointmentDialog = true;
    }

    deleteAppointment(appointment: Appointment) {
        this.deleteAppointmentDialog = true;
        this.appointment = { ...appointment };
    }

    confirmDeleteSelected() {
        this.deleteAppointmentsDialog = false;
        this.appointments = this.appointments.filter(
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
        this.appointments = this.appointments.filter(
            (val) => val._id !== this.appointment._id
        );
        this.messageAppointment.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointment Deleted',
            life: 3000,
        });
        this.appointment = {};
    }

    hideDialog() {
        this.appointmentDialog = false;
        this.submitted = false;
        this.filtreDialog = false;
    }

    showDialogFilter() {
        this.filtreDialog = true;
    }
    fetchList(query: string) {
        this.appointmentAppointment.getAppointment(query, (res) => {
            this.appointments = res;
        });
    }
    search() {
        var query: any = '?';
        const data: Appointment = {};
        if (this.appointment.amount) {
            query += '&amount=' + this.appointment.amount;
        }
        if (this.appointment.date) {
            query += '&date=' + this.appointment.date;
        }
        if (this.appointment.description) {
            query += '&description=' + this.appointment.description;
        }
        console.log(query);
        this.fetchList(query);
        this.filtreDialog = false;
    }
    resetFilter() {
        this.appointment = {};
    }
    saveAppointment() {
        const date = this.appointment.date;
        const description = this.appointment.description;
        const amount = this.appointment.amount;
        const data: Appointment = {
            description,
            amount,
            date,
        };

        if (this.appointment._id == undefined) {
            this.submitted = true;
            console.log(data);
            this.appointmentAppointment.saveAppointment(data, () => {
                this.messageAppointment.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Created',
                    life: 3000,
                });
                this.fetchList('');
            });
        } else {
            this.appointmentAppointment.updateAppointment(data, this.appointment._id, () => {
                this.messageAppointment.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Updated',
                    life: 3000,
                });
                this.fetchList('');
            });
        }
        this.appointmentDialog = false;
        this.appointment = {};
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i]._id === id) {
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
