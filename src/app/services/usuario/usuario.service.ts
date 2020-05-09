import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '@models/persona/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection: CollectionReference;

  constructor(private afs: AngularFirestore) {
    this.usuariosCollection = afs.firestore.collection('Usuarios');
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

  updateEstadoDocumentacion(usuario: UsuarioInterface, estado: string) {
    this.usuariosCollection.doc(usuario.id).update({"estado.documentacion": estado});
  }

  getAspirantes(): Promise<any> {
    return this.usuariosCollection.where('rol', '==', 'aspirante').get();
  }

  getAspirantesParaRevision(): Promise<any> {
    return this.usuariosCollection.where('estado.documentacion', '==', 'revision').get();
  }

  getAspirantesEnCorreccion(): Promise<any> {
    return this.usuariosCollection.where('estado.documentacion', '==', 'correccion').get();
  }

  getAspirantesValidados(): Promise<any> {
    return this.usuariosCollection.where('estado.documentacion', '==', 'validada').get();
  }

  deleteAspirante(user: UsuarioInterface){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`DeletedUsers/${user.id}`);
    const data: UsuarioInterface = {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      email: user.email,
      rol: 'aspirante',
    }
    return userRef.set(data, { merge: true }).then(() => this.usuariosCollection.doc(user.id).delete());
  }

}
