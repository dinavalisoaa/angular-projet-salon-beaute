import { Component, Input, OnInit } from '@angular/core';
import { Employee, Service } from 'src/app/models/models';

@Component({
    selector: 'app-emp-avatar',
    templateUrl: './emp-avatar.component.html',
})
export class EmpAvatarComponent implements OnInit {
    @Input() employee: Employee | null | undefined = {};
    constructor() {}

    ngOnInit(): void {}
}
