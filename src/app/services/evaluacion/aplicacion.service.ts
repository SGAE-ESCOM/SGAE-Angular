import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  private aplicacionesCollection: AngularFirestoreCollection<any>;
  private aplicacionesCollectionReference: CollectionReference;

  constructor(private db: AngularFirestore) {
    this.aplicacionesCollection = db.collection<Aplicacion>('Aplicaciones');
    this.aplicacionesCollectionReference = db.firestore.collection('Aplicaciones');
  }

  save(aplicacion: Aplicacion) {
    return this.aplicacionesCollection.add(aplicacion);
  }

  get(aplicacion: Aplicacion) {
    return this.aplicacionesCollectionReference.where('id', '==', aplicacion.id).get();
  }

  getAll(): Observable<Aplicacion[]> {
    return this.aplicacionesCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Aplicacion;
            const id = a.payload.doc.id;
            return { id, ...data } as Aplicacion;
          })
        )
      );
  }

  update(aplicacion: Aplicacion) {
    return this.aplicacionesCollection.doc(aplicacion.id).set(aplicacion);
  }

  delete(aplicacion: Aplicacion) {
    return this.aplicacionesCollection.doc(aplicacion.id).delete();
  }
}
