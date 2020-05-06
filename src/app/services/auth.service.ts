import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '@models/persona/usuario';
import { AngularFireModule } from '@angular/fire';
import * as firebase from "firebase/app";
import * as admin from "firebase-admin";
import * as sdkparams from "@services/admin/sdk-credential-params"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static usuario:firebase.User;
  private static usuarioC:UsuarioInterface;

  public userData$: Observable<firebase.User>;
  private adminRegistryApp:any = firebase.initializeApp({
    apiKey: "AIzaSyDB-mxqZtA7XDPebNg4KGLkcnZJRY3lb8w",
    authDomain: "sgae-escom.firebaseapp.com",
    databaseURL: "https://sgae-escom.firebaseio.com"
  }, "Secondary");


  // private adminApp: any = admin.initializeApp({
  //   credential: admin.credential.cert(sdkparams.ADMIN_PARAMS),
  //   databaseURL: "https://sgae-escom.firebaseio.com"
  // });
  
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userData$ = afsAuth.authState;
  }

  registrarUsuario( usuario: UsuarioInterface ) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(userData => {
          resolve(userData),
            this.updateInformacionUsuario(userData.user, usuario)
        }).catch(err => console.log(reject(err)));
    });
  }

  //Se creo una segunda conexion para que no se cambiara la sesion al crear un nuevo usuario
  registrarAdministrador( usuario: UsuarioInterface ) {

    return new Promise((resolve, reject) => {
      this.adminRegistryApp.auth().createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(userData => {
          resolve(userData),
            this.updateInformacionAdministrador(userData.user, usuario);
            this.adminRegistryApp.auth().signOut();
        }).catch(err => console.log(reject(err)));
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
    return this.updateInformacionUsuario(usuario, infoComplemento);
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateInformacionUsuario(usuarioRegistrado, usuario) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuarioRegistrado.uid}`);
    const data: UsuarioInterface = {
      id: usuarioRegistrado.uid,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuarioRegistrado.email,
      rol: 'aspirante'
    }
    return userRef.set(data, { merge: true });
  }

  private updateInformacionAdministrador(usuarioRegistrado, usuario) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuarioRegistrado.uid}`);
    const data: UsuarioInterface = {
      id: usuarioRegistrado.uid,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuarioRegistrado.email,
      permisos: usuario.permisos,
      rol: 'admin'
    }
    return userRef.set(data, { merge: true });
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UsuarioInterface>(`users/${userUid}`).valueChanges();
  }

  /**
   * 
   */
  findUsuario( uid ) {
    return this.afs.doc<UsuarioInterface>(`Usuarios/${uid}`).valueChanges();
  }

  setUsuario(usuario){
    AuthService.usuario = usuario;
  }

  getUsuario(){
    return AuthService.usuario;
  }

  setUsuarioC(usuario){
    AuthService.usuarioC = usuario;
  }

  getUsuarioC(){
    return AuthService.usuarioC;
  }
}
