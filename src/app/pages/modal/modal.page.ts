import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavParams, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

import { Resolve, ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api-service.service";
import { DataService } from "../services/data.service";



@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"]
})
export class ModalPage implements OnInit {
  shop: any;
  user: any;
  @Input() product: string;
  theProduct: any;

  btnText = 'Make Order';
  processing = false;

  constructor(
    public modalCtrl: ModalController,
    public router: Router,
    public dataService:DataService,
    public api:ApiService,
    public activeRoute: ActivatedRoute,
    public navParams: NavParams,
    public toast:ToastController
  ) {
    this.user = this.dataService.getActiveUser();
    this.shop = this.dataService.getActiveShop();
    this.theProduct = this.navParams.get('product');
  }

  onSubmit(form) {
    // console.log(this.user);
    this.btnText = 'Pease wait ..';
    this.processing = true;
    const order = form.value;
    order.product = this.theProduct;
    order.user = this.user;
    order.shop = this.shop;
    order.user_id = this.user.uid;
    order.shop_id = this.shop.id;
    order.status = 'new';
    this.api._add('orders', order, ( dataResult ) => {
      this.presentToast()
      this.btnText = 'Make Order';
      this.processing = true;
      if ( dataResult.flag ) {
        this.close('yes');
      } else {
        console.log(dataResult.error.message);
      }
    });
  }

  ngOnInit() {}

  close( data = null) {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }


  async presentToast() {
    const toast = await this.toast.create({
      message: 'Order Sucessfully Made',
      duration: 2000
    });
    toast.present();
  }
}