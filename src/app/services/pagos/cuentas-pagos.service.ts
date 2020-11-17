import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasPagosService {

  private cuentasCollection: AngularFirestoreCollection<any>;
  
  constructor(private db: AngularFirestore) {
    this.cuentasCollection = db.collection<CuentaPagos>('CuentasPagos');
  }

  save( cuenta: CuentaPagos ){
    cuenta.estado = "Pendiente";
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

  update(cuenta: CuentaPagos){
    console.log(cuenta)
    return this.cuentasCollection.doc(cuenta.id).set(cuenta);
  }

  delete(cuenta: CuentaPagos ){
    return this.cuentasCollection.doc(cuenta.id).delete();
  }
}
