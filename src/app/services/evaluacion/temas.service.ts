import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  private TemasCollection: AngularFirestoreCollection<any>;
  
  constructor(private db: AngularFirestore) {
    this.TemasCollection = db.collection<Tema>('Temas');
  }

  save( Tema: Tema ){
    return this.TemasCollection.add(Tema);
  }

  get(): Observable<Tema[]>{
    return this.TemasCollection
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

  update(Tema: Tema){
    return this.TemasCollection.doc(Tema.id).set(Tema);
  }

  delete( Tema: Tema ){
    return this.TemasCollection.doc(Tema.id).delete();
  }
}
