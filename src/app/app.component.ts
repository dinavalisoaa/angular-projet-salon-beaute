/*
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
}
*/

import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';
import { NotificationService } from './service/notification/notification.service';
import { UtilService } from './service/util-service/util.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private layoutService: LayoutService,
        private router: Router,
        private messageService: MessageService,
        private notificationService: NotificationService,
        private utilService: UtilService
    ) {}
    ngOnInit(): void {
        this.primengConfig.ripple = true; //enables core ripple functionality
        document.documentElement.style.fontSize = '14px';

        //optional configuration with the default configuration
        this.layoutService.config = {
            ripple: false, //toggles ripple on and off
            inputStyle: 'outlined', //default style for input elements
            menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
            colorScheme: 'light', //color scheme of the template, valid values are "light" and "dark"
            //theme: 'lara-light-indigo',         //default component theme for PrimeNG
            theme: 'mdc-light-deeppurple', //default component theme for PrimeNG
            scale: 14, //size of the body font size to scale the whole application
        };

        setInterval(() => {
            if (this.utilService.getToken().role == 'CUSTOMER') {
                const userId = this.utilService.getToken().info._id;
                this.notificationService
                    .checkForNewNotifications(userId)
                    .then((hasNewNotifications) => {
                        if (hasNewNotifications) {
                            console.log(
                                'Vous avez de nouvelles notifications !'
                            );
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Nouvelles notifications 🔔',
                                detail: 'Vous avez de nouvelles notifications !',
                                life: 10000,
                            });
                        }
                    });
            }
        }, 10000); // Vérifie toutes les 10 secondes

        setInterval(() => {
            if (this.utilService.checkExpiration()) {
                localStorage.removeItem('sessionId');
                Swal.fire({
                    icon:    'error',
                    title: 'Oops...',
                    text: 'Votre session a expiré',
                    footer: '',
                });
                this.router.navigate(['/customer/login']);
            }
        }, 10000);
    }
}
