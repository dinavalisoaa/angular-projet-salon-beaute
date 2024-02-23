import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        TeamRoutingModule,
        ButtonModule,
        ImageModule,
        CarouselModule,
        ToastModule

    ],
})
export class TeamModule { }
