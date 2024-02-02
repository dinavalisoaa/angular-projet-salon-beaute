import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreferenceComponent } from './preference.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PreferenceComponent }
    ])],
    exports: [RouterModule]
})
export class PreferenceRoutingModule { }
