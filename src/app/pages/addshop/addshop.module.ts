import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddshopPageRoutingModule } from './addshop-routing.module';

import { AddshopPage } from './addshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddshopPageRoutingModule
  ],
  declarations: [AddshopPage]
})
export class AddshopPageModule {}
