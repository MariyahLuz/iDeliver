import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {
  shops:any;
  constructor(
    public data:DataService,
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit() {
    this.fetchAllShops()
  }
   fetchAllShops(){
    this.api._get('shops').subscribe( data => {
      this.shops = data.docs.map(doc => doc.data());
      
    });
   }
   //fuction for visiting a shop
   visitShop(shop){
    localStorage.setItem('activeShop', JSON.stringify(shop));
    this.router.navigate(['/tab-bars/products']);
     
   }

   goToOrders(){
     this.router.navigate(['/orders'])
   }
}