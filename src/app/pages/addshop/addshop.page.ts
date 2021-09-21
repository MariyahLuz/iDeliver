import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-addshop',
  templateUrl: './addshop.page.html',
  styleUrls: ['./addshop.page.scss'],
})
export class AddshopPage implements OnInit {
  user: any;
  file: File;
  documentFile=""
  documentUrl=""
  btnText = ' Add Shop';
  btnDisabled= false;
  img: any;

  constructor(
    public fireAuth:AngularFireAuth,
    public firestore:AngularFireStorage,
    public service:ApiService,
    public router:Router,
    public afStorage:AngularFireStorage,
    public data:DataService,
    public toast:ToastController
  ) {
    this.user  = this.data.getActiveUser();
   }

  ngOnInit() {
  }
  
  async onSubmit(form) {
    this.btnText = 'Creating Shop .....';
    this.btnDisabled = true;
    const shop = form.value;
    shop.owner = this.user.uid;
    const url = await this.upload(this.documentFile);
    shop.imageUrl=url;
    this.service._add('shops', shop, ( result ) => {
      this.btnText = 'Add Shop';
      this.btnDisabled = false;
      this.img = 'assets/icon/cap3.jpg';
      if (result.flag ) {
        this.presentToast()
        localStorage.setItem('myshop', JSON.stringify(result.data));
        this.router.navigate(['/shop/orders'])
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

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Shop successfuly Created',
      duration: 2000
    });
    toast.present();
  }
}