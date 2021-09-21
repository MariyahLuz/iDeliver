import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { DataService } from '../../services/data.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  shop: any;
  orders: any;

  constructor(
    public data:DataService,
    public api:ApiService,
    private callNumber: CallNumber

  ) { }

  ngOnInit() {
    this.shop = this.data.getMyShop();
  }
  ionViewWillEnter() {
    this.fetchOrders();
  }
//function to load orders made
  fetchOrders() {
    const where =  {key: 'shop_id', value: this.shop.id };
    this.api._get('orders', where).subscribe( data => {
      this.orders = data.docs.map(doc => doc.data());
    });
  }

  // calling a user
  async callUser(phone) {
    try {
      await this.callNumber.callNumber(phone, true);
    } catch (e) {
      console.error(e);
    }
  }

  confirmOrder(order) {
    this.api._edit('appointments', order.id, {status: 'pending'}, async (result) => {
        this.fetchOrders();
    });
  }
}