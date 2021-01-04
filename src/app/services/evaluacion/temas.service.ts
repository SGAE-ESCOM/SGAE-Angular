import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreguntasService } from './preguntas.service';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  private temasCollection: AngularFirestoreCollection<any>;
  private temasCollectionReference: CollectionReference;
  private batch: firebase.firestore.WriteBatch;

  constructor(private db: AngularFirestore, private _pregunta: PreguntasService) {
    this.temasCollection = db.collection<Tema>('Temas');
    this.temasCollectionReference = db.firestore.collection('Temas');
  }

  save(Tema: Tema) {
    return this.temasCollection.add(Tema);
  }

  get(seccion: Seccion) {
    return this.temasCollectionReference.where('idSeccion', '==', seccion.id).get();
  }

  getAll(): Observable<Tema[]> {
    return this.temasCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Tema;
            const id = a.payload.doc.id;
            return { id, ...data } as Tema;
          })
        )
      );
  }

  update(tema: Tema) {
    return this.temasCollection.doc(tema.id).set(tema);
  }

  delete(Tema: Tema) {
    return this.temasCollection.doc(Tema.id).delete();
  }

  deleteAll(temas: Tema[]) {
    //Obtener todas las preguntas por temas
    let promisesPreguntas = [];
    //Agregar la promesa que obtiene las preguntas pro tema
    temas.forEach(tema => {
      promisesPreguntas.push(this._pregunta.getAllPreguntas(tema));
    });
    //Merge de todos los resolve y eliminacion de preguntas
    Promise.all( promisesPreguntas ).then( resPreguntas => {
      let preguntas = resPreguntas.reduce( (prev, current) => {
        return prev.concat(current);
      }, [] );
      this._pregunta.deleteAll(preguntas).then( res => res );
    });
    
    //Eliminar todos los temas en un batch
    this.batch = this.db.firestore.batch();
    temas.forEach(tema => {
      const temaRef: any = this.temasCollection.doc<any>(tema.id).ref;
      this.batch.delete(temaRef);
    });
    return this.batch.commit();
  }
}