import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-aboutshop',
  templateUrl: './aboutshop.page.html',
  styleUrls: ['./aboutshop.page.scss'],
})
export class AboutshopPage implements OnInit {
   shop:any
  constructor(public data:DataService,public api:ApiService,public router:Router) { }

  ngOnInit() {
    this.shop = this.data.getMyShop();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}