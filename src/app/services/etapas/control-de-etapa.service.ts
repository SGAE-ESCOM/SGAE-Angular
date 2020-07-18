import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ControlDeEtapaService {

  private fechasEtapasCollection: CollectionReference;

  constructor(private db: AngularFirestore) {
    firebase.database().ref('/.info/serverTimeOffset').once('value')
    .then(function stv(data) {
      const horaServidor = data.val() + Date.now();
      //console.log( data.val() + Date.now()) ;
    }, function (err) {
      return err;
    });
    this.fechasEtapasCollection = db.firestore.collection('FechasEstapas');
  }

  getFechasEtapas(){
    return this.fechasEtapasCollection.get();
  }

  getHoraServidor(){
    firebase.database().ref('/.info/serverTimeOffset').once('value')
    .then(function stv(data) {
      const horaServidor = data.val() + Date.now();
    }, function (err) {
      return err;
    });
  }
}
