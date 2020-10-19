import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Grupo } from '@models/evaluacion/Grupo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  
  private gruposCollection: AngularFirestoreCollection<any>;
  
  constructor(private db: AngularFirestore) {
    this.gruposCollection = db.collection<Grupo>('Grupos');
  }

  save( grupo: Grupo ){
    return this.gruposCollection.add(grupo);
  }

  get(): Observable<any>{
    return this.gruposCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Grupo;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  update(grupo: Grupo){
    console.log(grupo)
    return this.gruposCollection.doc(grupo.id).set(grupo);
  }

  delete( grupo: Grupo ){
    return this.gruposCollection.doc(grupo.id).delete();
  }
}
