import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateAppointmentRoutingModule } from './create-appointment-routing.module';


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { TestComponent } from 'src/app/test/test.component';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateAppointmentComponent } from './create-appointment.component';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        ToolbarModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,DataViewModule,
        CalendarModule,
        DialogModule,
        SidebarModule
    ],
    declarations: [CreateAppointmentComponent],
    exports: [
        CreateAppointmentComponent
    ]
})
export class CreateAppointmentModule { }
