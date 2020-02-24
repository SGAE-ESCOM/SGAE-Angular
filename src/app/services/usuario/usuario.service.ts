import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '@models/persona/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection: CollectionReference;

  constructor(private firestore: AngularFirestore) {
    this.usuariosCollection = firestore.firestore.collection('Usuarios');
  }

  //CRUD
  getUsuarios(): Observable<UsuarioInterface[]> {
    return null;
    /*return this.usuariosCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as UsuarioInterface;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
    );*/
  }

  getAspirantes(): Promise<any> {
    return this.usuariosCollection.where('rol', '==', 'aspirante').get();
  }
}
