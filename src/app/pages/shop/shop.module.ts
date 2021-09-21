import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { ShopPage } from './shop.page';
import { GalleryPage } from './gallery/gallery.page';
import { ProductsPage } from './products/products.page';
import { AboutshopPage } from './aboutshop/aboutshop.page';
import { OrdersPage } from './orders/orders.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage,
    children: [
      {
        path: 'gallery',
        children: [
          {
            path: '',
            component:GalleryPage
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component:ProductsPage
          }
        ]
      },
      {
        path: 'aboutshop',
        children: [
          {
            path: '',
            component:AboutshopPage
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component:OrdersPage
          }
        ]
      },
      {
       path: '',
       redirectTo: '/shop/products',
        pathMatch: 'full'
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/shop/products',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ShopPage,ProductsPage,OrdersPage,GalleryPage,AboutshopPage]
})
export class ShopPageModule {}
