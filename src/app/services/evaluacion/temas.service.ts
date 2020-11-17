import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  private temasCollection: AngularFirestoreCollection<any>;
  private temasCollectionReference: CollectionReference;

  constructor(private db: AngularFirestore) {
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

}