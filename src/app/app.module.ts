import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase,'iDeliver'),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule ,// storage
    BrowserModule,
    FormsModule, //forms module
    CommonModule, //common module
    IonicModule.forRoot(), 
    AppRoutingModule],

  

  providers: [{ provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy },
            CallNumber,
            SplashScreen,
            StatusBar
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}