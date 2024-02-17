import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationComponent } from './reservation.component';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReservationRoutingModule,
        FullCalendarModule
    ],
    declarations: [
        ReservationComponent
    ]
})
export class ReservationModule { }
