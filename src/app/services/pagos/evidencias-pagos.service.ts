import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { EvidenciaPago } from '@models/cuentas-pagos/evidencia-pago';
import { UsuarioInterface } from '@models/persona/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasPagosService {

  private cuentasCollection: AngularFirestoreCollection<any>;
  private cuentasCollectionReference: CollectionReference;
  
  constructor(private db: AngularFirestore) {
    this.cuentasCollection = db.collection<EvidenciaPago>('EvidenciasPagos');
    this.cuentasCollectionReference = db.firestore.collection('EvidenciasPagos');
  }

  save( value: EvidenciaPago, userID: string){
    return this.cuentasCollection.doc(userID).set(value);
  }

  getEvidencia(id: string): Promise<any>{
    return this.cuentasCollectionReference.doc(id).get();
  }

  getEvidenciaObs(usuario: UsuarioInterface): Observable<any>{
    return this.cuentasCollection.doc(usuario.id)
    .snapshotChanges()
    .pipe(
      map(change =>{
          return change.payload.data() as any;
      })
    );
  }
}
