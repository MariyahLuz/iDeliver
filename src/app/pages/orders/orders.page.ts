import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  user: any;
  page = 0;
  // data: any;
  maximumPages = 3;
  order = {};
  orders: any;
  products: any;
  shop: any;
  constructor(
    public data:DataService,
    public api:ApiService,
    public actionSheetController: ActionSheetController,
    public toast:ToastController,
    public router:Router

  ) { }

  ngOnInit() {
    this.user = this.data.getActiveUser();
  }

  //loading action sheet
  async presentActionSheet(order) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Action',
      buttons: [
        {},
        {
          text: 'Confirm',
          icon: 'share',
          handler: () => {
            this.actOnOrder({status: 'confirmed'}, order);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.actOnOrder({status: 'canceled'}, order);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  ionViewWillEnter() {
    this.fetchMyOrders();
  }

  fetchMyOrders(){
    const where = {key: 'user_id', value: this.user.uid };
    this.api._get('orders', where).subscribe(data => {
      this.orders = data.docs.map(doc => doc.data());
    });
  }

   
  async showToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  actOnOrder(status, order) {
    // console.log(status, appointment);
    this.api._edit('orders', order.id, status, async (result) => {
      await this.showToast(`Confirmation done`);
      this.fetchMyOrders();
    });
  }

  goToShops(){
    this.router.navigate(['/shops'])
  }

}