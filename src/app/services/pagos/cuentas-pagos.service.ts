import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasPagosService {

  private cuentasCollection: AngularFirestoreCollection<any>;
  private cuentasCollectionReference: CollectionReference;
  
  constructor(private db: AngularFirestore) {
    this.cuentasCollection = db.collection<CuentaPagos>('CuentasPagos');
    this.cuentasCollectionReference = db.firestore.collection('CuentasPagos');
  }

  save( cuenta: CuentaPagos ){
    cuenta.estado = "Pendiente";
    cuenta.gruposIds = [];
    cuenta.datosAds = [];
    return this.cuentasCollection.add(cuenta);
  }

  get(): Observable<any>{
    return this.cuentasCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as CuentaPagos;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getCuenta(id): Promise<any>{
    return this.cuentasCollectionReference.doc(id).get();
  }

  updateDatosCuenta(cuenta: CuentaPagos){
    console.log(cuenta)
    return this.cuentasCollection.doc(cuenta.id).set(cuenta);
  }

  delete(cuenta: CuentaPagos ){
    return this.cuentasCollection.doc(cuenta.id).delete();
  }
}
