import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  //Funciones Gestion Administradores
  getAdministradores(): Promise<any> {
    return this.usuariosCollection.where('rol', '==', "admin").get();
  }

  getAdministrador(usuario: UsuarioInterface): Promise<any>{
    return this.usuariosCollection.where('id', '==', usuario.id).get();
  }

  updatePermisosAdministrador(usuario: UsuarioInterface, permisos: number){
    this.usuariosCollection.doc(usuario.id).update({"permisos": permisos});
  }
}
