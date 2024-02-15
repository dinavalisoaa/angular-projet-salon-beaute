import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateAppointmentComponent } from './create-appointment.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CreateAppointmentComponent }
    ])],
    exports: [RouterModule]
})
export class CreateAppointmentRoutingModule { }
