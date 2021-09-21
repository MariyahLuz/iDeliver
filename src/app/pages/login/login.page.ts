import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  btnDisabled = false;
  error: any;
  type = 'buyer';
  btnText = 'Login';
  processing = false;
  userProfile:any;

  constructor(
    public fireAuth:AngularFireAuth,
    public firestore:AngularFireStorage,
    public service:ApiService,
    public router:Router,
    public toast:ToastController
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.btnText = 'Please wait ...';
    this.processing = true;
    const user = form.value;
    const email = user.phone + '@iDeliverapp.com';
    this.loginUser(user.password, email).then( data => {
      const uid = data.user.uid;
      this.service._getOne('users', uid).subscribe( result => {
          if ( result.exists ) {
            this.userProfile = result.data();
            localStorage.setItem('activeUser', JSON.stringify(this.userProfile));
            if (this.userProfile.type === 'buyer') {
              this.router.navigate(['/shops'])
            } else {
              this.service._get('shops', {key: 'vendor', value: uid}).subscribe( shopData => {
                  const shops = shopData.docs.map(doc => doc.data());
                  if ( shops.length === 0) {
                    this.router.navigate(['/addshop'])

                  } else if (shops.length === 1) {
                    localStorage.setItem('myshop', JSON.stringify(shops[0]));
                    this.router.navigate(['/shop/orders'])
                  }
              });
            }
          } else {
            this.btnText = 'Login';
            this.processing = false;
            this.error = 'User not found here';
          }
      });
    }).catch(error => {
      this.btnText = 'Login';
      this.processing = false;
      this.error = error.message;
    });
  }

  //method to login user
  loginUser(password, email) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  goToSignup(){
    this.router.navigate(['/signup'])
  }
}