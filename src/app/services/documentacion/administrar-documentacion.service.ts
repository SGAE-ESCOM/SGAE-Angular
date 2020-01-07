import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrarDocumentacionService {

  private documentosCollection: AngularFirestoreCollection<TipoDato>;

  constructor(private firestore: AngularFirestore) {
    this.documentosCollection = firestore.collection<TipoDato>('RecepcionDocumentos');
  }

  //
  getDocumentos(): Observable<TipoDato[]> {
    return this.documentosCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as TipoDato;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  createDocumento(documento: TipoDato) {
    return this.firestore.collection('RecepcionDocumentos').add(documento);
  }

  updateDocumento(documento: TipoDato) {
    delete documento.nombre;
    this.firestore.doc('policies/' + documento.nombre).update(documento);
  }

}