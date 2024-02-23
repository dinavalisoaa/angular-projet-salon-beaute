import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { CreateAppointmentModule } from '../customer/create-appointment/create-appointment.module';
import { HeaderComponent } from './header/header.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CarouselModule } from 'primeng/carousel';
import { TeamComponent } from './team/team.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        ChipModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        CreateAppointmentModule,
        CarouselModule,
        ToastModule
    ],
    declarations: [LandingComponent, HeaderComponent, AppointmentComponent,TeamComponent],
    exports:[HeaderComponent,AppointmentComponent]
})
export class LandingModule { }
