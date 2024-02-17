import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { AuthGuardPermission } from './auth-permission';

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
                        path: 'service',
                        canActivate: [AuthGuardPermission ],
                        data: {
                            role: 'MANAGER',
                        },
                        loadChildren: () =>
                            import('./service-crud/service-crud.module').then(
                                (m) => m.ServiceCrudModule
                            ),
                    },
                    {
                        path: 'expense',
                        canActivate: [AuthGuardPermission ],
                        data: {
                            role: 'MANAGER',
                        },
                        loadChildren: () =>
                            import('./expense/expense.module').then(
                                (m) => m.ExpenseModule
                            ),
                    },
                    {
                        path: 'personnel',
                        canActivate: [AuthGuardPermission ],
                        data: {
                            role: 'MANAGER',
                        },
                        loadChildren: () =>
                            import('./personnel/personnel.module').then(
                                (m) => m.PersonnelModule
                            ),
                    },
                    {
                        path: 'special-offer',
                        canActivate: [AuthGuardPermission ],
                        data: {
                            role: 'MANAGER',
                        },
                        loadChildren: () =>
                            import('./special-offer/special-offer.module').then(
                                (m) => m.SpecialOfferModule
                            ),
                    },
                    {
                        path: 'dashboard',
                        canActivate: [AuthGuardPermission ],
                        data: {
                            role: 'MANAGER',
                        },
                        loadChildren: () =>
                            import('./dashboard/dashboard.module').then(
                                (m) => m.DashboardModule
                            ),
                    },
                    {
                        path: 'reservation',
                        canActivate: [AuthGuardPermission ],
                        data: {
                            role: 'MANAGER',
                        },
                        loadChildren: () =>
                            import('./reservation/reservation.module').then(
                                (m) => m.ReservationModule
                            ),
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
