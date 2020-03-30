import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdministrarDocumentacionService {

  private requisitosCollection: AngularFirestoreCollection<TipoDato>;
  private batch: firebase.firestore.WriteBatch;

  constructor(private db: AngularFirestore, private af: AngularFireDatabase) {
    this.requisitosCollection = db.collection<TipoDato>('RecepcionDocumentos');

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

  updateDocumento(id: any, requisito: TipoDato) {
    return this.requisitosCollection.doc(id).set(requisito);
  }

  ordenarRequisitos(requisitos: TipoDato[]): Promise<any> {
    this.batch = this.db.firestore.batch();
    requisitos.forEach((requisito, index) => {
      console.log( requisito.num+ ' ==> '+ index);
      const requisitoRef: any = this.requisitosCollection.doc<any>(requisito.id).ref;
      this.batch.update(requisitoRef, { num: index });
    });
    return this.batch.commit();
  }

  public deleteDocumento(id: any) {
    return this.requisitosCollection.doc(id).delete();
  }

}