import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {
    Appointment,
    Employee,
    Service,
    TokenObject,
} from 'src/app/models/models';
import Swal from 'sweetalert2';
import { ProductService } from '../../service/product.service';
import { UtilService } from 'src/app/service/util-service/util.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { AccountService } from 'src/app/service/account/account.service';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { DataView } from 'primeng/dataview';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styles: [
        `
            #hero {
                background: linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.2),
                        rgba(255, 255, 255, 0.2)
                    ),
                    radial-gradient(
                        77.36% 256.97% at 77.36% 57.52%,
                        #eeefaf 0%,
                        #c3e3fa 100%
                    );
                height: 700px;
                overflow: hidden;
            }

            .pricing-card:hover {
                border: 2px solid var(--cyan-200) !important;
            }

            @media screen and (min-width: 768px) {
                #hero {
                    -webkit-clip-path: ellipse(150% 87% at 93% 13%);
                    clip-path: ellipse(150% 87% at 93% 13%);
                    height: 580px;
                }
            }

            @media screen and (min-width: 1300px) {
                #hero > img {
                    position: absolute;
                    transform: scale(1.2);
                }

                #hero > div > p {
                    max-width: 450px;
                }
            }

            @media screen and (max-width: 1300px) {
                #hero {
                    height: 600px;
                }

                #hero > img {
                    position: static;
                    transform: scale(1);
                    margin-left: auto;
                }

                #hero > div {
                    width: 100%;
                }

                #hero > div > p {
                    width: 100%;
                    max-width: 100%;
                }
            }
        `,
    ],
})
export class LandingComponent implements OnInit {

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    services: any[] = [
        { image: 'service-1.jpg' },
        { image: 'service-2.jpg' },
        { image: 'service-3.jpg' },
        { image: 'service-4.jpg' },
        { image: 'service-5.jpg' },
        { image: 'service-6.jpg' },
        { image: 'service-7.jpg' },
        { image: 'service-8.jpg' },
        { image: 'service-9.jpg' },
        { image: 'service-10.jpg' },
        { image: 'service-11.jpg' },
        { image: 'service-12.png' },
        { image: 'service-13.jpg' },
        { image: 'service-14.jpg' },
        { image: 'service-15.jpg' },
        { image: 'service-15.jpg' }
    ];

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private productService: ProductService,
        private utilService: UtilService,
        private serviceService: ServiceService,
        private appointmentService: AppointmentService,
        private accountService: AccountService,
        // private service: MessageService,
        private customerService: CustomerService
    ) {}
    ngOnInit() {}
}
