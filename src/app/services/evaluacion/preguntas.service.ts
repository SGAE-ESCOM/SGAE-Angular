import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private temasCollection: AngularFirestoreCollection<any>;
  private temasCollectionReference: CollectionReference;
  
  constructor(private db: AngularFirestore) {
    this.temasCollection = db.collection<Pregunta>('Preguntas');
    this.temasCollectionReference = db.firestore.collection('Preguntas');
  }

  getPreguntas(tema:Tema) {
    return this.temasCollectionReference.where('idTema', '==', tema.id).get();
  }

  save( Pregunta: Pregunta ){
    return this.temasCollection.add(Pregunta);
  }

  get(): Observable<Pregunta[]>{
    return this.temasCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Pregunta;
          const id = a.payload.doc.id;
          return { id, ...data } as Pregunta;
        })
      )
    );
  }

  update(pregunta: Pregunta){
    return this.temasCollection.doc(pregunta.id).set(pregunta);
  }

  delete( pregunta: Pregunta ){
    return this.temasCollection.doc(pregunta.id).delete();
  }
}
