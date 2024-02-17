import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/models/models';

@Component({
    selector: 'app-service-avatar',
    templateUrl: './service-avatar.component.html',
})
export class ServiceAvatarComponent implements OnInit {
    @Input() services: Service[]| undefined =[];
    constructor() {}

    ngOnInit(): void {}
}
