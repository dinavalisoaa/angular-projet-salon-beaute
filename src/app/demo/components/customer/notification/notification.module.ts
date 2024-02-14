import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { NotificationRoutingModule } from './notification-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { SpecialOfferModule } from '../../manager/special-offer/special-offer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NotificationRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        DialogModule,
        ToastModule,
        BadgeModule,
        SpecialOfferModule
    ],
    declarations: [
        NotificationComponent
    ]
})
export class NotificationModule { }
