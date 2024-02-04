import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        {
            path: '', component: AppLayoutComponent,
            children: [
                { path: 'service', loadChildren: () => import('./service-crud/service-crud.module').then(m => m.ServiceCrudModule) },
                { path: 'expense', loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule) },
                { path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule) }
            ],
        }
    ])],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
