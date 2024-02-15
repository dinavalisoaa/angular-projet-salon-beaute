import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: LandingComponent },
            { path: 'appointment', component: AppointmentComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class LandingRoutingModule {}
