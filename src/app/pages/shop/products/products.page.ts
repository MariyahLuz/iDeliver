import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api-service.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  openForm: boolean = false;
  shop: any;
  products: any;
  file: File;
  documentFile=""
  documentUrl=""
  btnText = 'Add Product';
  processing = false;
  img: any;
  constructor(
    public data:DataService,
    public api:ApiService,
    public afStorage:AngularFireStorage,
    public toast:ToastController
  ) {

   }

  ngOnInit() {
    this.shop = this.data.getMyShop(); 
    this.img = 'assets/icon/cap3.jpg';
    
  }

  ionViewWillEnter(){
    this.fetchProduct();
  }
   
  fetchProduct() {
    const where =  {key: 'shop_id', value: this.shop.id };
    this.api._get('products', where).subscribe( data => {
      this.products = data.docs.map(doc => doc.data());
      // console.log(this.products)
    });
  }

  addBtnClicked() {
    this.openForm = !this.openForm;
  }


  async addServices( form ) {
    this.btnText = 'Please wait ... ';
    this.processing = true;
    const product = form.value;
    product.shop_id = this.shop.id;
    const url = await this.upload(this.documentFile);
    product.imageUrl=url;
    this.api._add('products', product, ( result ) => {
          this.btnText = 'Add Product';
          this.processing = false;
          this.img = 'assets/icon/cap3.jpg';
          if ( result.flag) {
              this.addBtnClicked();
              this.presentToast()
              this.fetchProduct();
          } else {
            alert(result.error.message);
          }
      });
    
  }
      //selecting image
  selectImage(event) {
    this.documentFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.documentUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  //uploading images
  async upload(file) {
    // console.log(file);
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref("documents/" + randomId);
    const task = await ref.put(file);
    const downloadURL = await task.ref.getDownloadURL();
    return downloadURL;
  }

  //method to create a toaster
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Product Successfully Added',
      duration: 2000
    });
    toast.present();
  }


}