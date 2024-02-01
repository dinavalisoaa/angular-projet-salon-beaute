import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
