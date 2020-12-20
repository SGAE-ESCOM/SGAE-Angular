import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  private SeccionesCollection: AngularFirestoreCollection<any>;
  
  constructor(private db: AngularFirestore) {
    this.SeccionesCollection = db.collection<Seccion>('Secciones');
  }

  save( seccion: Seccion ){
    return this.SeccionesCollection.add(seccion);
  }

  get(): Observable<Seccion[]>{
    return this.SeccionesCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Seccion;
          const id = a.payload.doc.id;
          return { id, ...data } as Seccion;
        })
      )
    );
  }

  getById(idSeccion: string){
    return this.SeccionesCollection.doc(idSeccion).get();
  }

  update(Seccion: Seccion){
    return this.SeccionesCollection.doc(Seccion.id).set(Seccion);
  }

  delete( Seccion: Seccion ){
    return this.SeccionesCollection.doc(Seccion.id).delete();
  }
}
