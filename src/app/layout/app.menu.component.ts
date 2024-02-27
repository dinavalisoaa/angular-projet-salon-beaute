import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { TokenObject } from '../models/models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    model_customer: any[] = [];

    model_employee: any[] = [];

    model_manager: any[] = [];

    role: any = '';

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        public utilService: UtilService
    ) { }

    ngOnInit() {


        this.checkUserRole();
        console.log("ROLE: " + this.role);

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] },
                    { label: 'MyDashBoard', icon: 'pi pi-fw pi-id-card', routerLink: ['/mydashboard'] }
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];


        this.model_customer = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Page d\'accueil', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Mon compte',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/customer'],
                items: [
                    {
                        label: 'Mon profil',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['profile']
                    },
                    {
                        label: 'Mes rendez-vous',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Nouveau',
                                icon: 'pi pi-fw pi-plus-circle',
                                routerLink: ['appointment/making']
                            },
                            {
                                label: 'Historique',
                                icon: 'pi pi-fw pi-history',
                                routerLink: ['appointment/history']
                            }
                        ]
                    },
                    {
                        label: 'Mon compte monétaire',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['account/load']
                    },
                    {
                        label: 'Mes préférences',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['preference']
                    },
                    {
                        label: 'Mes notifications',
                        icon: 'pi pi-fw pi-bell',
                        routerLink: ['notifications'],
                        badge: 3
                    }
                ]
            },
        ];

        this.model_employee = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/employee/dashbord'] }
                ]
            },
            {
                label: 'Mon compte',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/employee'],
                items: [
                    {
                        label: 'Mon profil',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['profile']
                    },
                    {
                        label: 'Rendez-vous',
                        icon: 'pi pi-fw pi-calendar-times',
                        routerLink: ['appointment']
                    },
                    {
                        label: 'Tâches',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['task']
                    }
                ]
            },
        ];

        this.model_manager = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/manager/dashboard'] }
                ]
            },
            {
                label: 'Mon compte',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/manager'],
                items: [
                    {
                        label: 'Réservation',
                        icon: 'pi pi-fw pi-calendar-times',
                        routerLink: ['reservation']
                    },
                    {
                        label: 'Employés',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Liste',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['personnel']
                            },
                            {
                                label: 'Temps de travail',
                                icon: 'pi pi-fw pi-clock',
                                routerLink: ['working-time']
                            }
                        ]
                    },
                    {
                        label: 'Service',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['service']
                    },
                    {
                        label: 'Offre spéciale',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['special-offer']
                    },
                    {
                        label: 'Dépense',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['expense']
                    }
                ]
            },
        ];
    }

    checkUserRole() {
        const role = this.utilService.getToken().role;
        this.role = role;
    }
}
