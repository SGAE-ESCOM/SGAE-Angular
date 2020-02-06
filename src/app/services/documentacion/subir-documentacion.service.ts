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

  private documentacionCollection: AngularFirestoreCollection<any>;
  private documentosCollection: AngularFirestoreCollection<TipoDato>;

  constructor(private firestore: AngularFirestore) {
    this.documentacionCollection = firestore.collection<any>('Documentacion');
    this.documentosCollection = firestore.collection<TipoDato>('RecepcionDocumentos');
  }

  //CRUD
  saveDocumentacion(usuario: UsuarioInterface, documentacion: any) {
    return this.documentacionCollection.doc(usuario.id).set(documentacion);
  }

  getDocumentacion(usuario: UsuarioInterface): Observable<any>{
    return this.documentacionCollection.doc(usuario.id)
    .snapshotChanges()
    .pipe(
      map(change =>{
          //const data = change.payload.data() as any;
          //const id = change.payload.id;
          return change.payload.data() as any;
      })
    );
  }

  getRequisitos(): Observable<TipoDato[]> {
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
