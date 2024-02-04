import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonnelComponent } from './personnel.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PersonnelComponent }
	])],
	exports: [RouterModule]
})
export class PersonnelRoutingModule { }
