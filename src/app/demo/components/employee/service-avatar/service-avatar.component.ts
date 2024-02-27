import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/models/models';

@Component({
    selector: 'app-service-avatar',
    templateUrl: './service-avatar.component.html',
})
export class ServiceAvatarComponent implements OnInit {
    @Input() services: Service[] | undefined = [];
    illustrations: any[] | undefined = [];
    autre: any = '';
    constructor() {}

    // getCurrence(item: any, services: Service[] | undefined) {
    //     let count = services?.reduce(
    //         (acc, cur) => (cur.name == item ? ++acc : acc),
    //         0
    //     );
    //     return count;
    // }

    getDistinct(array: Service[] | undefined) {
        return [...new Set(array?.map((item, index) => item.illustration))];
    }
    ngOnInit(): void {
        this.illustrations = this.getDistinct(this.services).filter(
            (val, index) => index < 5
        );
        if (this.services != undefined) {
            this.autre = (this.services?.length - 5)+'+';
        }
        // this.services=this.getDistinct(this.services);
    }
}
