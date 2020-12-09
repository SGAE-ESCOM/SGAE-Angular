import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EvidenciaPago } from '@models/cuentas-pagos/evidencia-pago';
import { UsuarioInterface } from '@models/persona/usuario';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasPagosService {

  private cuentasCollection: AngularFirestoreCollection<any>;
  // private cuentasCollectionReference: CollectionReference;
  
  constructor(private db: AngularFirestore) {
    this.cuentasCollection = db.collection<EvidenciaPago>('EvidenciasPagos');
    // this.cuentasCollectionReference = db.firestore.collection('EvidenciasPagos');
  }

  save( value: EvidenciaPago, userID: string){
    return this.cuentasCollection.doc(userID).set(value);
  }
}
