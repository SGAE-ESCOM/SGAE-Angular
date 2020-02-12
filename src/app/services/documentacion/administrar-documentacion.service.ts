import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '@models/persona/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdministrarDocumentacionService {

  private requisitosCollection: AngularFirestoreCollection<TipoDato>;

  constructor(private firestore: AngularFirestore) {
    this.requisitosCollection = firestore.collection<TipoDato>('RecepcionDocumentos');
  }

  //
  saveDocumento(documento: TipoDato) {
    return this.requisitosCollection.add(documento);
  }

  getDocumentos(): Observable<TipoDato[]> {
    return this.requisitosCollection
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

  updateDocumento(id:any, requisito: TipoDato) {
    return this.requisitosCollection.doc(id).set(requisito);
  }

  /*updateDocumento(documento: TipoDato) {
    delete documento.nombre;
    this.firestore.doc('policies/' + documento.nombre).update(documento);
  }*/

  public deleteDocumento(id: any) {
    return this.requisitosCollection.doc(id).delete();
  }

}