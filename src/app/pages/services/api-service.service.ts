import { Injectable } from '@angular/core';
//communicates with database
import { AngularFirestore } from '@angular/fire/firestore';
//communicates with the online bucket for file storage
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( public fireStore: AngularFirestore, public fireStorage: AngularFireStorage) { }

  //method to get collections from database  
  _get(collection, where = null) {
    if ( where !== null ) {
      return this.fireStore.collection(collection, ref => ref.where(where.key, '==', where.value).orderBy('timeStamp', 'desc')).get();
    } else {
      return this.fireStore.collection(collection, ref => ref.orderBy('timeStamp', 'desc')).get();
    }
  }
   // method  to get a single collection from database 
  _getOne(collection, uid) {
     return this.fireStore.collection(collection).doc(uid).get();
  }


    // method to add data to our cloud database

  _add(collection, data, callback) {
    data.timeStamp = + new Date();
    this.fireStore.collection(collection).add(data)
    .then( (ref) => {
      const id = ref.id;
      data.id = id;
      this._edit(collection, id, {id}, () => {});
      callback({flag: true, data});
   }).catch( error => callback({flag: false, error}));
  }

  // method to add a user to our database

  _addUser(collection, data, callback) {
    data.timeStamp = + new Date();
    this.fireStore.collection(collection).doc(data.uid).set(data)
    .then( (ref) => {
      callback({flag: true, data});
   }).catch( error => callback({flag: false, error}));
  }

  // method to edit data in our database

  _edit(collection, uid, data, callback) {
    this.fireStore.collection(collection)
    .doc(uid)
    .update(data)
    .then( data => callback({ data }))
    .catch( error =>  callback({error}));
  }

   // method to delete data from our database
  _delete( collection, uid, callback) {
    this.fireStore.collection(collection)
    .doc(uid)
    .delete()
    .then( result => callback({result}))
    .catch(error => callback({error}));
  }
   

   //method to upload a file to our online bucket
   
  _uploadImageFile( file, folder, callback) {
      let fileRef = this.fireStorage.storage.ref(`${folder}/${+new Date()}.jpg`);
      fileRef.put(file).then((snapshot)  => {
        snapshot.ref.getDownloadURL().then( url => {
          callback({flag: true, url});
        }).catch( error => {
          callback({ flag: false, error});
        });
      }).catch( error => {
        callback({ flag: false, error});
      });
  }



}