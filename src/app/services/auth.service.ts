import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '@models/persona/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) {
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
    return this.afs.doc<UsuarioInterface>(`users/${userUid}`).valueChanges();
  }
}
