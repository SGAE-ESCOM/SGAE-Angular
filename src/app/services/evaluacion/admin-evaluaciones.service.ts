import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminEvaluacionesService {

  private evaluacionesCollection: AngularFirestoreCollection<any>;
  private evaluacionesCollectionReference: CollectionReference;

  constructor(private db: AngularFirestore) {
    this.evaluacionesCollection = db.collection<Tema>('Evaluaciones');
    this.evaluacionesCollectionReference = db.firestore.collection('Evaluaciones');
  }

  save(evaluacion: Evaluacion) {
    return this.evaluacionesCollection.add(evaluacion);
  }

  get(seccion: Seccion) {
    return this.evaluacionesCollectionReference.where('idSeccion', '==', seccion.id).get();
  }

  getAll(): Observable<Evaluacion[]> {
    return this.evaluacionesCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Evaluacion;
            const id = a.payload.doc.id;
            return { id, ...data } as Evaluacion;
          })
        )
      );
  }

  update(evaluacion: Evaluacion) {
    return this.evaluacionesCollection.doc(evaluacion.id).set(evaluacion);
  }

  delete(evaluacion: Evaluacion) {
    return this.evaluacionesCollection.doc(evaluacion.id).delete();
  }
}
