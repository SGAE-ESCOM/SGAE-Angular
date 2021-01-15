import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '@models/persona/usuario';
import { EtapasService } from '@services/etapas/etapas.service';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static usuario:firebase.User;
  private static usuarioC:UsuarioInterface;
  public static etapas: any;

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
  
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private _etapaService: EtapasService) {
    this.userData$ = afsAuth.authState;
  }

  registrarUsuario( usuario: UsuarioInterface ) {
    return this.afsAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(userData => {
          return this.updateInformacionUsuario(userData.user, usuario);
        }).catch(err => console.error(err));
  }

  //Se creo una segunda conexion para que no se cambiara la sesion al crear un nuevo usuario
  registrarAdministrador( usuario: UsuarioInterface ) {
    return this.adminRegistryApp.auth().createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(userData => {
            this.updateInformacionAdministrador(userData.user, usuario);
            this.adminRegistryApp.auth().signOut();
        }).catch(err => console.error(err));
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
    return this._etapaService.getEstadosAspirante().then(estadosAspirante => {
      if (estadosAspirante.exists) {
        const estado = estadosAspirante.data();
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuarioRegistrado.uid}`);
        const data: UsuarioInterface = {
          id: usuarioRegistrado.uid,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          email: usuarioRegistrado.email,
          estado: estado,
          rol: 'aspirante'
        }
        return userRef.set(data, { merge: true });
      }
    });
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

  passwordReset(email){
    return this.afsAuth.auth.sendPasswordResetEmail(email);
  }

  /********************************************* GETTERS AND SETTERS ****************************************/
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

  setEtapas( etapas: any[] ){
    AuthService.etapas = etapas.reduce( (prev, current) => {
      prev[current.id] = current;
      return prev;
    }, {} );
    delete AuthService.etapas.convocatoria;
    delete AuthService.etapas.registro;
  }

  getEtapas(){
    return AuthService.etapas;
  }
}
