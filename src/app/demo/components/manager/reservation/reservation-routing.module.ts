import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReservationComponent }
    ])],
    exports: [RouterModule]
})
export class ReservationRoutingModule { }
