import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddshopPage } from './addshop.page';

const routes: Routes = [
  {
    path: '',
    component: AddshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddshopPageRoutingModule {}
