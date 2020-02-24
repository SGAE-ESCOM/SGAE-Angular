import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ValidarDocumentacionService {

  private documentacionCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.documentacionCollection = firestore.collection<any>('Documentacion');
  }
}