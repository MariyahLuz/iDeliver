import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutshopPageRoutingModule } from './aboutshop-routing.module';

import { AboutshopPage } from './aboutshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutshopPageRoutingModule
  ],
  declarations: [AboutshopPage]
})
export class AboutshopPageModule {}
