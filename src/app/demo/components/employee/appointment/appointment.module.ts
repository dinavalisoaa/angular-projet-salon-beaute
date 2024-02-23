import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DragDropModule } from 'primeng/dragdrop';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppointmentRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        DragDropModule,
          RatingModule,
        MenuModule,
        MegaMenuModule,
        PanelMenuModule,
        MenubarModule,
        BreadcrumbModule,
        InputTextModule,
        TieredMenuModule,
        TabMenuModule,
        MultiSelectModule,
        InputTextModule,
        DropdownModule,
        DialogModule,
        RatingModule,
        AutoCompleteModule,
        ButtonModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule
    ],
    declarations: [AppointmentComponent],
})
export class AppointmentModule {}
