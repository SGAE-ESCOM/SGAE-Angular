import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuarioInterface } from '@models/persona/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarDocumentacionService {

  private documentacionCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.documentacionCollection = firestore.collection<any>('Documentacion');
  }

  //CRUD
  updateDocumentacion(usuario: UsuarioInterface, documentacion: any) {
    return this.documentacionCollection.doc(usuario.id).set(documentacion);
  }

  getDocumentacion(usuario: UsuarioInterface): Observable<any>{
    return this.documentacionCollection.doc(usuario.id)
    .snapshotChanges()
    .pipe(
      map(change =>{
          return change.payload.data() as any;
      })
    );
  }
}