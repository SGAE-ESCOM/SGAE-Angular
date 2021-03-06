import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Etapa } from '@models/etapas/etapa';
import { map } from 'rxjs/operators';
import { FechaEtapa } from '@models/etapas/fecha-etapa';
import { ETAPAS_BUSCAR } from '@models/etapas/etapa.enum';

@Injectable({
  providedIn: 'root'
})
export class EtapasService {

  private etapasCollection: AngularFirestoreCollection<any>;
  private etapasCollectionReference: CollectionReference;
  private fechasEtapasCollection: AngularFirestoreCollection<any>;
  private batch: firebase.firestore.WriteBatch;

  constructor(private db: AngularFirestore, private data: AngularFireDatabase) {
    this.etapasCollection = db.collection<any>('EstadosAspirante');
    this.fechasEtapasCollection = db.collection<any>('FechasEstapas');
    this.etapasCollectionReference = db.firestore.collection('FechasEstapas');
  }

  //CRUD EESTADOS_ASPIRANTE
  saveEstadosAspirante(estadosAspirante: any) {
    return this.etapasCollection.doc('estado').set(estadosAspirante);
  }

  getEstadosAspirante() {
    return this.etapasCollection.doc('estado').get().toPromise();
  }

  getEstadosAspiranteObserver() {
    return this.etapasCollection.doc('estado').get();
  }

  saveEtapas(ordenEtapas: any) {
    return this.etapasCollection.doc('ordenEtapas').set(ordenEtapas);
  }

  getEtapas(){
    return this.etapasCollection.doc('ordenEtapas').get().toPromise();
  }

  //CRUD FECHAS
  saveFechasEtapas(fechas: any[]): Promise<any> {
    this.batch = this.db.firestore.batch();
    console.log(fechas);
    let fechasFormateada = this.convertFecha(fechas);
    Object.entries(fechas).forEach(([nombre, etapa]: any) => {
      const etapaRef: any = this.db.collection("FechasEstapas").doc<any>(nombre).ref;
      this.batch.set(etapaRef, etapa);
    });
    return this.batch.commit();
  }

  getFechasEtapas() {
    return this.fechasEtapasCollection.get().toPromise();
  }

  getFechasEtapasObserver() {
    return this.fechasEtapasCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as FechaEtapa;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );;
  }

  deleteAllFechas(etapas: Etapa[]) {
    this.batch = this.db.firestore.batch();
    etapas.forEach(etapa => {
      const etapaRef: any = this.db.collection("FechasEstapas").doc<any>(etapa.valor).ref;
      this.batch.delete(etapaRef);
    });
    return this.batch.commit();
  }

  //LOGICA DEL SERVICE
  private convertFecha(fechas: any) {
    return Object.entries(fechas).map(([nombre, etapa]: any) => {
      //etapa.fechaInicio = new Date(etapa.fechaInicio).getTime();
      //etapa.fechaTermino = new Date(etapa.fechaTermino).getTime();
      etapa.color = etapa.color.nombre;
      return etapa;
    });
  }

  getEtapaResultados() {
    return this.etapasCollectionReference.doc(ETAPAS_BUSCAR.publicacionResultados.valor).get();
  }

  getEtapa(etapa: Etapa){
    return this.etapasCollectionReference.doc(etapa.valor).get();
  }
}
