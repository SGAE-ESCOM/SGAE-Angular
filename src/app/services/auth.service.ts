import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { UserInterface } from '@models/user';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '@models/persona/usuario';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private _toas: ToastrService) {
    this.userData$ = afsAuth.authState;
  }

  registrarUsuario( usuario: UsuarioInterface ) {
    console.log(usuario);
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(userData => {
          resolve(userData),
            this.updateInformacionUsuairo(userData.user, usuario)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  finalizarRegistroGoogle(usuario, infoComplemento){
    this._toas.success("Hola desde el service");
    return this.updateInformacionUsuairo(usuario, infoComplemento);
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  isNewUsuarioGoogle(){
    
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateInformacionUsuairo(usuarioRegistrado, usuario) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuarioRegistrado.uid}`);
    const data: UsuarioInterface = {
      id: usuarioRegistrado.uid,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuarioRegistrado.email,
      roles: {
        aspirante: true
      }
    }
    return userRef.set(data, { merge: true });
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
}
