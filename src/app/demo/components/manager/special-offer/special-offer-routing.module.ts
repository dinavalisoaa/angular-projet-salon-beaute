import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpecialOfferComponent } from './special-offer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SpecialOfferComponent }
    ])],
    exports: [RouterModule]
})
export class SpecialOfferRoutingModule { }
