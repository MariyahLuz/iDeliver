import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  btnText="Create Account"
  btnDisabled=false;
  error:any;
  constructor(
    public fireAuth:AngularFireAuth,
    public firestore:AngularFireStorage,
    public service:ApiService,
    public router:Router,
    public toast:ToastController
    ) { }

  ngOnInit() {
  }
 // this is a signup fuctionality for both vendors and buyers
  onSubmit(form){
    this.btnText = 'Creating Account...';
    this.btnDisabled = true;
    const user = form.value;
    const email = user.phone + '@iDeliverapp.com';
    this.createUser(user.password, email)
      .then(data => {
        user.uid = data.user.uid;
        delete user.password;
        this.service._addUser('users', user, resultSet => {
          this.btnText = 'Create Account';
          this.btnDisabled = false;
          this.presentToast()
          if (resultSet.flag) {
            if (user.type === 'buyer') {
              
              this.router.navigate(['/shops'])
            } else {
              
              this.router.navigate(['/addshop'])
            }
            localStorage.setItem('activeUser', JSON.stringify(user));
          } else {
            this.error = resultSet.error.message;
          }
        });
      })
      .catch(error => {
        this.btnDisabled = false;
        this.btnText = 'Create Account';
        this.error = error.message;
      });
  }
   // method to create user and save in the database
  createUser(password, email) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
  //method to present a notification

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Account Successfully Created',
      duration: 2000
    });
    toast.present();
  }


}
