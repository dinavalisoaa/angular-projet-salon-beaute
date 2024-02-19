import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkingTimeComponent } from './workingtime.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: WorkingTimeComponent }
	])],
	exports: [RouterModule]
})
export class WorkingTimeRoutingModule { }
