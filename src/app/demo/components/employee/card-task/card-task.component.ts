import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cU, em } from '@fullcalendar/core/internal-common';
import {
    Appointment,
    Customer,
    Employee,
    TokenObject,
} from 'src/app/models/models';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    selector: 'app-card-task',
    templateUrl: './card-task.component.html',
})
export class CardTaskComponent implements OnInit {
    @Input() appointment: Appointment = {};
    @Input() icon: string = 'pi pi-check';
    @Input() dragStart: EventEmitter<any> | undefined;
    // @Output() dragEnd: EventEmitter<any[]> = new EventEmitter<any[]>();
    // @Output() dragStart: EventEmitter<any[]> = new EventEmitter<any[]>();

    constructor(private uService: UtilService) {}
    format(date: any) {
        return this.uService.toDatetimeFr(date);
    }
    getCurrentEmp() {
        const token: TokenObject = this.uService.getToken();
        const emp: Employee = token.info;
        return emp;
    }
    isPrefered(customer: Customer | undefined) {
        const emp = this.getCurrentEmp();
        let bool = false;
        const preference: Employee[] | undefined =
            customer?.preference?.employee;
        let val = preference?.filter((val, i) => val == emp._id);
        if (val != undefined) {
            return val?.length > 0;
        }
        return bool;
    }
    showService(appointment: Appointment) {
        let str = '';
        if (appointment.service != undefined)
            appointment.service.forEach((element) => {
                str += element.name + ' & \n ';
            });
        return str;
    }
    ngOnInit(): void {}
}
