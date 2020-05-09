import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioInterface } from '@models/persona/usuario';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usuariosCollection: CollectionReference;

  constructor(private afs: AngularFirestore) {
    this.usuariosCollection = afs.firestore.collection('Usuarios');
  }

  //Funciones Gestion Administradores
  getAdministradores(): Promise<any> {
    return this.usuariosCollection.where('rol', '==', "admin").get();
  }

  getAdministrador(usuario: UsuarioInterface): Promise<any>{
    return this.usuariosCollection.where('id', '==', usuario.id).get();
  }

  updatePermisosAdministrador(usuario: UsuarioInterface, permisos: number){
    return this.usuariosCollection.doc(usuario.id).update({"permisos": permisos});
  }

  updateInformacionAdministrador(usuario: UsuarioInterface, data: UsuarioInterface){
    return this.usuariosCollection.doc(usuario.id).update({
      'nombres': data.nombres,
      'apellidos': data.apellidos
    });
  }

  deleteAdministrador(user: UsuarioInterface){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`DeletedUsers/${user.id}`);
    const data: UsuarioInterface = {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      email: user.email,
      rol: 'admin',
      permisos: user.permisos
    }
    return userRef.set(data, { merge: true }).then(() => this.usuariosCollection.doc(user.id).delete());
  }

//   deleteInfoAdministrador(usuario: UsuarioInterface){
//     return tithis.usuariosCollecon.doc(usuario.id).delete();
//   }

}
