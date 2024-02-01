import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'service', loadChildren: () => import('./service/service-crud/service-crud.module').then(m => m.ServiceCrudModule) },

           ])],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
