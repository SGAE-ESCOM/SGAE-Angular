import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private preguntasCollection: AngularFirestoreCollection<any>;
  private preguntasCollectionReference: CollectionReference;
  private batch: firebase.firestore.WriteBatch;
  
  constructor(private db: AngularFirestore, private _toastr: ToastrService) {
    this.preguntasCollection = db.collection<Pregunta>('Preguntas');
    this.preguntasCollectionReference = db.firestore.collection('Preguntas');
  }

  getPreguntas(tema:Tema) {
    return this.preguntasCollectionReference.where('idTema', '==', tema.id).get();
  }
  
  getAllPreguntas(tema:Tema) {
    return this.preguntasCollectionReference.where('idTema', '==', tema.id).get().then((querySnapshot) => {
      let preguntas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        preguntas.push(pregunta);
      });
      return preguntas;
    }).catch(err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });;
  }

  save( Pregunta: Pregunta ){
    return this.preguntasCollection.add(Pregunta);
  }

  get(): Observable<Pregunta[]>{
    return this.preguntasCollection
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
    return this.preguntasCollection.doc(pregunta.id).set(pregunta);
  }

  delete( pregunta: Pregunta ){
    return this.preguntasCollection.doc(pregunta.id).delete();
  }

  deleteAll( preguntas: Pregunta[]){
    this.batch = this.db.firestore.batch();
    preguntas.forEach(pregunta => {
      const preguntaRef: any = this.preguntasCollection.doc<any>(pregunta.id).ref;
      this.batch.delete(preguntaRef);
    });
    return this.batch.commit();
  }
}
