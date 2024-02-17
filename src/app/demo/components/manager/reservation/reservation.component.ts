import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  templateUrl: './reservation.component.html',
  providers: [ReservationService]
})
export class ReservationComponent implements OnInit {
    events: {}[] = [];

    eventsDetails: {}[] = [];

    calendarOptions: CalendarOptions = {
        locale: 'fr',
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        headerToolbar: {
            // left: 'prev,next today',
            left: '',
            center: 'title',
            // right: 'dayGridMonth,timeGridWeek,timeGridDay'
            // right: 'dayGridMonth,timeGridWeek'
            right: 'prev,next today',
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true
    };

    calendarOptionsDetails: CalendarOptions = {
        locale: 'fr',
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true
    };

    constructor(
        private reservationService: ReservationService
    ) { }

    ngOnInit() {
        this.fetchNumberPerDay();
        this.fetchReservations();
    }

    pickEventColor(number: number){
        var color = 'blue';
        if(number <= 2){
            color = '#dc143c';
        }
        if(number >= 3 && number <= 10){
            color = 'orange';
        }
        if(number >= 11){
            color = 'green';
        }
        return color;
    }

    fetchNumberPerDay() {
        this.reservationService.getNumberPerDay((res) => {
            for (const element of res) {
                this.events.push({
                    title: `${element.numberOfReservations} rendez-vous`,
                    start: `${element._id.year}-${element._id.month.toString().padStart(2, '0')}-${element._id.day.toString().padStart(2, '0')}`,
                    color: this.pickEventColor(element.numberOfReservations)
                });
            }
            console.log(this.events);
            this.calendarOptions.events = this.events;
        });
    }

    fetchReservations() {
        this.reservationService.getAllReservations((res) => {
            for (const element of res) {
                this.eventsDetails.push({
                    title: `${element.customer.name} ${element.customer.firstname}`,
                    start: `${element.date}`,
                    color: '#dc143c'
                });
            }
            console.log(this.eventsDetails);
            this.calendarOptionsDetails.events = this.eventsDetails;
        });
    }
}

