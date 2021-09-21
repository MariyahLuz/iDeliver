import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
 
  shop: any;
  pictures: any;
  product_id: any;
  img: any;

  constructor(public api:ApiService,public data:DataService, public router:Router) {

   }

  ngOnInit() {
    this.shop = this.data.getMyShop();
    this.img = 'assets/icon/shop.png';
  }
  
  gotoProducts(){
    this.router.navigate(['/shop/products'])
  }

  ionViewWillEnter() {
    this.fetchProducts();
  }

  fetchProducts() {
    const where =  {key: 'shop_id', value: this.shop.id };
    this.api._get('products', where).subscribe( data => {
      this.pictures = data.docs.map(doc => doc.data());
    });
  }
}