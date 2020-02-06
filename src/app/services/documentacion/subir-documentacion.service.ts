import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '@models/persona/usuario';

@Injectable({
  providedIn: 'root'
})
export class SubirDocumentacionService {

  private documentosCollection: AngularFirestoreCollection<TipoDato>;

  constructor(private firestore: AngularFirestore) {
    this.documentosCollection = firestore.collection<any>('Documentacion');
  }

  //CRUD
  saveDocumentacion(usuario: UsuarioInterface, documentacion: any) {
    return this.documentosCollection.doc(usuario.id).set(documentacion);
  }

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
}
