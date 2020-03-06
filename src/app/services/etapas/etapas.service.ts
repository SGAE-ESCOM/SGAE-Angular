import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtapasService {

  private etapasCollection: AngularFirestoreCollection<any>;
  
  constructor(private firestore: AngularFirestore) {
    this.etapasCollection = firestore.collection<any>('EstadosAspirante');
  }

  //CRUD
  saveEstadosAspirante(estadosAspirante: any) {
    return this.etapasCollection.doc('estado').set( estadosAspirante );
  }

  getEstadosAspirante() {
    return this.etapasCollection.doc('estado').get().toPromise();
    /*return this.etapasCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
    );*/
  }
}
