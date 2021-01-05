import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
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

  findAllInEvaluacion(seccion: Seccion){
    return this.evaluacionesCollectionReference.where('secciones', 'array-contains', seccion.id).get().then((querySnapshot) => {
      let preguntas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        preguntas.push(pregunta);
      });
      return preguntas;
    }).catch(err => { console.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
  }

  update(evaluacion: Evaluacion) {
    return this.evaluacionesCollection.doc(evaluacion.id).set(evaluacion);
  }

  delete(evaluacion: Evaluacion) {
    return this.evaluacionesCollection.doc(evaluacion.id).delete();
  }
}
