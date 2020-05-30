import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Etapa } from '@models/etapas/etapa';

@Injectable({
  providedIn: 'root'
})
export class EtapasService {

  private etapasCollection: AngularFirestoreCollection<any>;
  private fechasEtapasCollection: AngularFirestoreCollection<any>;
  private batch: firebase.firestore.WriteBatch;

  constructor(private db: AngularFirestore, private data: AngularFireDatabase) {
    this.etapasCollection = db.collection<any>('EstadosAspirante');
    this.fechasEtapasCollection = db.collection<any>('FechasEstapas');
  }

  //CRUD EESTADOS_ASPIRANTE
  saveEstadosAspirante(estadosAspirante: any) {
    return this.etapasCollection.doc('estado').set( estadosAspirante );
  }

  getEstadosAspirante() {
    return this.etapasCollection.doc('estado').get().toPromise();
  }

  //CRUD FECHAS
  saveFechasEtapas(fechas:any[]): Promise<any>{
    this.batch = this.db.firestore.batch();
    Object.entries(fechas).forEach( ([nombre, etapa]:any) => {
      const etapaRef: any = this.db.collection("FechasEstapas").doc<any>(nombre).ref;
      this.batch.set(etapaRef, etapa);
    });
    return this.batch.commit();
  }

  getFechasEtapas(){
    return this.fechasEtapasCollection.get().toPromise();
  }

  deleteAllFechas(etapas: Etapa[]){
    this.batch = this.db.firestore.batch();
    etapas.forEach( etapa => {
      const etapaRef: any = this.db.collection("FechasEstapas").doc<any>(etapa.valor).ref;
      this.batch.delete(etapaRef);
    });
    return this.batch.commit();
  }

  //LOGICA DEL SERVICE
  private convertFecha( fechas:any ){
    return Object.entries(fechas).map( ([nombre, etapa]:any) => {
      etapa.fechaInicio = new Date(etapa.fechaInicio).getTime();
      etapa.fechaTermino = new Date(etapa.fechaTermino).getTime();
      etapa.color = etapa.color.nombre;
      return etapa;
    });
  }
}
