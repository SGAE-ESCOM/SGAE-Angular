import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Resultado } from '@models/evaluacion/resultado';
import { UsuarioInterface } from '@models/persona/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private resultadosCollection: AngularFirestoreCollection<any>;
  private resultadosCollectionReference: CollectionReference;

  constructor(private db: AngularFirestore) {
    this.resultadosCollection = db.collection<Resultado>('Resultados');
    this.resultadosCollectionReference = db.firestore.collection('Resultados');
  }

  save(resultado: Resultado) {
    return this.resultadosCollection.add(resultado);
  }

  getByUsuario(usuario: UsuarioInterface) {
    return this.resultadosCollectionReference.where('idUsuario', '==', usuario.id).get();
  }

  getAll(): Observable<Resultado[]> {
    return this.resultadosCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Resultado;
            const id = a.payload.doc.id;
            return { id, ...data } as Resultado;
          })
        )
      );
  }

  update(resultado: Resultado) {
    return this.resultadosCollection.doc(resultado.id).set(resultado);
  }

  delete(resultado: Resultado) {
    return this.resultadosCollection.doc(resultado.id).delete();
  }
}
