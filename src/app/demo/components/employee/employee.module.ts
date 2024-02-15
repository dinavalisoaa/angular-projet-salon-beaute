import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CardTaskComponent } from './card-task/card-task.component';
import { ChipModule } from 'primeng/chip';
import { ServiceAvatarComponent } from './service-avatar/service-avatar.component';
import { TestcssComponent } from './testcss/testcss.component';

@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        ChipModule
    ],
    declarations: [
      TestcssComponent
    ],


})
export class EmployeeModule { }
