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

  /**
   * La Hora del servidor con respecto a la hora de CDMX es de 15 seg como
   * outline, es decir en el peor de los casos 12 segundos es el máximo
   * tiempo entre el servidor y la hora real.
   * En javascript la hora se da milisegundos, entonces 12, equivalen a
   * 15,000
   */
  async getHoraServidor() {
    return firebase.database().ref('/.info/serverTimeOffset').once('value')
    .then( data => {
      //const horaServidor = data.val() + Date.now();
      return ( data.val() < 15000 && data.val() > -15000);
    }, err => {
      return err;
    });
  }
}
