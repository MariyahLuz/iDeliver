import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-aboutshop',
  templateUrl: './aboutshop.page.html',
  styleUrls: ['./aboutshop.page.scss'],
})
export class AboutshopPage implements OnInit {
   shop:any;
  constructor(public data:DataService) { }

  ngOnInit() {
    this.shop = JSON.parse(localStorage.getItem('activeShop'));
  }

}