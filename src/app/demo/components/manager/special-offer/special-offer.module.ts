import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialOfferComponent } from './special-offer.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { SpecialOfferRoutingModule } from './special-offer-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SpecialOfferRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        DialogModule,
        ToastModule
    ],
    declarations: [SpecialOfferComponent],
    exports: [
        SpecialOfferComponent
    ]
})
export class SpecialOfferModule { }
