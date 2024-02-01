import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'service', loadChildren: () => import('./service-crud/service-crud.module').then(m => m.ServiceCrudModule) }
    ])],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
