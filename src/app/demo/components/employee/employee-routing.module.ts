import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'login',
                loadChildren: () =>
                    import('./login/login.module').then((m) => m.LoginModule),
            },
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'appointment',
                        loadChildren: () =>
                            import('./appointment/appointment.module').then(
                                (m) => m.AppointmentModule
                            ),
                    },
                ],
            },
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'task',
                        loadChildren: () =>
                            import('./task/task.module').then(
                                (m) => m.TaskModule
                            ),
                    },
                ],
            }
        ]),
    ],
    exports: [RouterModule],
})
export class EmployeeRoutingModule {}
