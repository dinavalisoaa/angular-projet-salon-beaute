import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
        {
            path: '', component: AppLayoutComponent,
            children: [
                { path: 'preference', loadChildren: () => import('./preference/preference.module').then(m => m.PreferenceModule) },
                { path: 'appointment/making', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule) },
                { path: 'appointment/history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) }
            ],
        }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
