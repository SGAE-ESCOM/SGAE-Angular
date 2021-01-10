import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UsuarioInterface } from '@models/persona/usuario';
import { Grupo } from '@models/evaluacion/Grupo';
import { EstadoPago } from '@models/cuentas-pagos/enums/estado-pago.enum';
import * as Alerts from '@shared/alertas/Alerts';
import { Resultado } from '@models/evaluacion/resultado';
import { Alert } from '@models/utils/Alert';
import { EstadoEvaluacion } from '@models/evaluacion/estado-evaluacion';
import { EstadoDocumentacion } from '@models/documentacion/enums/estado-documentacion.enum';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection: AngularFirestoreCollection<any>;
  private usuariosCollectionReference: CollectionReference;
  private batch: firebase.firestore.WriteBatch;

  constructor(private db: AngularFirestore) {
    this.usuariosCollection = db.collection<UsuarioInterface>('Usuarios');
    this.usuariosCollectionReference = db.firestore.collection('Usuarios');
  }

  /*********************************************** DOCUMENTACION **********************************************/
  getAspirantesParaRevision(): Promise<any> {
    return this.usuariosCollectionReference.where('estado.documentacion', '==', 'revision').get();
  }

  getAspirantesEnCorreccion(): Promise<any> {
    return this.usuariosCollectionReference.where('estado.documentacion', '==', 'correccion').get();
  }

  getAspirantesValidados(): Promise<any> {
    return this.usuariosCollectionReference.where('estado.documentacion', '==', 'validada').get();
  }

  updateEstadoDocumentacion(usuario: UsuarioInterface, estado: string) {
    if (typeof usuario.alertas === "undefined") usuario.alertas = new Array();
    usuario.alertas = Alerts.removerGrupoAlertas(usuario.alertas, Alerts.ALERTAS_DOCUMENTACION);
    
    if (estado == EstadoDocumentacion.CORRECCION) usuario.alertas.push(Alerts.DOCUMENTACION_CORRECCION.nombre);
    else if (estado == EstadoDocumentacion.VALIDADA) usuario.alertas.push(Alerts.DOCUMENTACION_VALIDADA.nombre);

    this.usuariosCollectionReference.doc(usuario.id).update({ "estado.documentacion": estado, "alertas": usuario.alertas  });
  }

  /*********************************************** EVALUACION **********************************************/
  geAspirantesPorAplicacion(idAplicacion: string, resultado: string): Promise<any> {
    let idHistorial = 'historialAplicacion.' + idAplicacion + ".resultado"
    return this.usuariosCollectionReference.where(idHistorial, '==', resultado).get();
  }

  addEvaluacion(idUsuario: string, idAplicacion: string, resultado: Resultado) {
    let idHistorial = 'historialAplicacion.' + idAplicacion;
    let historialAplicacion = {};
    historialAplicacion[idHistorial] = { resultado: resultado.resultado, aciertos: resultado.aciertosTotales }
    return this.usuariosCollectionReference.doc(idUsuario).update(historialAplicacion);
  }

  updateEstadoEvaluacion(usuario: UsuarioInterface, estado: string) {
    return this.usuariosCollectionReference.doc(usuario.id).update({ "estado.evaluacionConocimientos": estado });
  }

  updateEstadoEvaluacionPorAplicacion(usuarios: UsuarioInterface[], estado: string){
    this.batch = this.db.firestore.batch();
    usuarios.forEach((usuario, index) => {
      const requisitoRef: any = this.usuariosCollection.doc<any>(usuario.id).ref;
      this.batch.update(requisitoRef, { 'estado.evaluacionConocimientos': estado });
    });
    return this.batch.commit();
  }

  enviarNotificacionEvaluacion(usuarios: UsuarioInterface[]){
    this.batch = this.db.firestore.batch();
    usuarios.forEach((usuario, index) => {
      //Preparando notificación
      if (typeof usuario.alertas === "undefined") usuario.alertas = new Array();
        usuario.alertas = Alerts.removerGrupoAlertas(usuario.alertas ,Alerts.ALERTAS_EVALUACION);
      
      if (usuario.estado.evaluacionConocimientos == EstadoEvaluacion.VALIDO) usuario.alertas.push(Alerts.EVALUACION_VALIDO.nombre);
      else if (usuario.estado.evaluacionConocimientos == EstadoEvaluacion.NO_VALIDO) usuario.alertas.push(Alerts.EVALUACION_NO_VALIDO.nombre);

      //Prepara petición 
      const requisitoRef: any = this.usuariosCollection.doc<any>(usuario.id).ref;
      this.batch.update(requisitoRef, { "alertas": usuario.alertas });
    });
    return this.batch.commit();
  }


  /*********************************************** PAGOS *****************************************************/
  getAspirantesConEstadoPago(estado: string) {
    return this.usuariosCollectionReference.where('estado.pago', '==', estado).get();
  }

  updateEstadoPago(usuario: UsuarioInterface, estado: string) {
    if (typeof usuario.alertas === "undefined") usuario.alertas = new Array();
    usuario.alertas = Alerts.removerGrupoAlertas(usuario.alertas ,Alerts.ALERTAS_PAGOS);
    
    if (estado == EstadoPago.INVALIDA) usuario.alertas.push(Alerts.EVIDENCIA_INVALIDA.nombre);
    else if (estado == EstadoPago.VALIDADA) usuario.alertas.push(Alerts.EVIDENCIA_CORRECTA.nombre);

    this.usuariosCollectionReference.doc(usuario.id).update({ "estado.pago": estado, "alertas": usuario.alertas });
  }

  /*********************************************** USUARIOS *****************************************************/
  
  updateUsuario(usuario: UsuarioInterface, userData: UsuarioInterface){
    return this.usuariosCollectionReference.doc(usuario.id).update({ "nombres" : userData.nombres, "apellidos": userData.apellidos });
  }
  
  gasignarGrupo(usuario: UsuarioInterface, grupo: Grupo) {
    return this.usuariosCollectionReference.doc(usuario.id).update({ grupo });
  }

  getAspirantes(): Promise<any> {
    return this.usuariosCollectionReference.where('rol', '==', 'aspirante').get();
  }

  deleteAspirante(user: UsuarioInterface) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`DeletedUsers/${user.id}`);
    const data: UsuarioInterface = {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      email: user.email,
      rol: 'aspirante',
    }
    return userRef.set(data, { merge: true }).then(() => this.usuariosCollectionReference.doc(user.id).delete());
  }

  removerAlerta(usuario: UsuarioInterface, alerta: Alert){
    if(typeof usuario.alertas !== 'undefined'){
      let index = usuario.alertas.indexOf(alerta.nombre, 0);
      if (index > -1) usuario.alertas.splice(index, 1);
      this.usuariosCollectionReference.doc(usuario.id).update({"alertas": usuario.alertas });
    }
    return usuario.alertas;
  }

}
