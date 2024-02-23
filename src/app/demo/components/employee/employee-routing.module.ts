import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { AuthGuardPermission } from '../manager/auth-permission';

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
                        canActivate: [AuthGuardPermission],
                        data: {
                            role: 'EMP',
                        },
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
                        path: 'dashbord',
                        canActivate: [AuthGuardPermission],
                        data: {
                            role: 'EMP',
                        },
                        loadChildren: () =>
                            import('./dashboard/dashboard.module').then(
                                (m) => m.DashboardModule
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
                        canActivate: [AuthGuardPermission],
                        data: {
                            role: 'EMP',
                        },
                        loadChildren: () =>
                            import('./task/task.module').then(
                                (m) => m.TaskModule
                            ),
                    },
                ],
            }, {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'profile',
                        canActivate: [AuthGuardPermission],
                        data: {
                            role: 'EMP',
                        },
                        loadChildren: () =>
                            import('./profile/profile.module').then(
                                (m) => m.ProfileModule
                            ),
                    },
                ],
            }
        ]),
    ],
    exports: [RouterModule],
})
export class EmployeeRoutingModule {}
