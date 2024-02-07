import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceComponent } from './preference.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        PreferenceRoutingModule,
        ButtonModule,
        ImageModule,
        GalleriaModule,
        CarouselModule,
        ToastModule
    ],
    declarations: [PreferenceComponent]
})
export class PreferenceModule { }
