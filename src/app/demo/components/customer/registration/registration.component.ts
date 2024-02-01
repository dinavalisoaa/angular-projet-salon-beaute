import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-registration-customer',
    templateUrl: './registration.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegistrationComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    selectedState: any;

    dropdownItems = [
        { name: 'Homme', code: 'Homme' },
        { name: 'Femme', code: 'Femme' }
    ];

    constructor(public layoutService: LayoutService, public router: Router) { }
}
