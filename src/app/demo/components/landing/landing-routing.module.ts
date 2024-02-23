import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { TeamComponent } from './team/team.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: LandingComponent },
            { path: 'appointment', component: AppointmentComponent },
            { path: 'team', component: TeamComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class LandingRoutingModule {}
