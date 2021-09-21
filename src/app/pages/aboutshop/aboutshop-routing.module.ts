import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutshopPage } from './aboutshop.page';

const routes: Routes = [
  {
    path: '',
    component: AboutshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutshopPageRoutingModule {}
