import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //setting active user

  getActiveUser() {
    return JSON.parse(localStorage.getItem('activeUser'));
  }
//function to set vendor shop
  setMyShop(data){
    return localStorage.setItem('myshop', JSON.stringify(data));

  }
//function to get vendor shop
  getMyShop() {
    return JSON.parse(localStorage.getItem('myshop'));
  }
//function to get active shop
  getActiveShop() {
    return JSON.parse(localStorage.getItem('activeShop'));
  }
}
