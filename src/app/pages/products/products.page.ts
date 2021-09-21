import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ApiService } from '../services/api-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  shop:any;
  products:any;
  product = {};
  constructor(
    public api:ApiService,
    public data:DataService,
    public modalController:ModalController,
    public router:Router
  ) { }

  ngOnInit() {
    this.shop = JSON.parse(localStorage.getItem('activeShop'));
  }

  ionViewWillEnter() {
    const where = { key: 'shop_id', value: this.shop.id };
    this.api._get('products', where).subscribe(data => {
      this.products = data.docs.map(doc => doc.data());
    });
  }

  // method to launch Modal
   async presentModal(product) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        product
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.router.navigate(['/orders']);
    }


  }

  backToShops(){
    this.router.navigate(['/shops'])
  }
}