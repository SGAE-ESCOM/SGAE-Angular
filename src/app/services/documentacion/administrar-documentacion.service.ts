import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TipoDato } from '@models/documentacion/tipo-dato';

@Injectable({
  providedIn: 'root'
})
export class AdministrarDocumentacionService {
  constructor(private firestore: AngularFirestore) { }

  //
  getDocumentos() {
    return this.firestore.collection('RecepcionDocumentos').snapshotChanges();
  }

  createDocumento(documento: TipoDato){
    return this.firestore.collection('RecepcionDocumentos').add(documento);
  }

  updateDocumento(documento: TipoDato){
    delete documento.nombre;
    this.firestore.doc('policies/' + documento.nombre).update(documento);
}

}