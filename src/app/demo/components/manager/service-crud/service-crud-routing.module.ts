import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceCrudComponent } from './service-crud.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ServiceCrudComponent }
	])],
	exports: [RouterModule]
})
export class ServiceCrudRoutingModule { }
