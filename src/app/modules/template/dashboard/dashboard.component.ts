import { Component } from '@angular/core';
import { GESTIONAR_GRUPOS_ALT, getCardsByEtapas, GRUPOS_ALT } from '@routing/ListLinks';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_HOME } from '@routing/ListLinks';
import { cardAnimationFadeIn, fadeInDown } from '@shared/utils/animations/router.animations';
import { AuthService } from '@services/auth.service';
import { filtrarLinksPorPermisos } from '@shared/admin-permissions/permissions';
import { UsuarioInterface } from '@models/persona/usuario';
import { momentJS } from '@shared/utils/traduccion/moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ cardAnimationFadeIn(), fadeInDown() ]
})

export class DashboardComponent {

  usuario: UsuarioInterface;
  cards = [];
  isAspirante: boolean = false;
  etapas: EtapaProgress[] = [];
  etapasDisponibles = {};

  constructor(private _authService: AuthService) {
    BreadcrumbComponent.update(BC_HOME);
    this.usuario = this._authService.getUsuarioC();
    this.etapasDisponibles = this._authService.getEtapas();
    this.defineCards(this.usuario);
    this.isAspirante = this.usuario.rol === 'aspirante';
    if(this.isAspirante)
      this.definirProgreso();
  }

  /**
   * Función que define los cards que serán utilzados en el proceso de Admisión,
   * Docuentación, Evaluación, Pagos y/o Publicación de resultados
   * @param usuario: UsuarioInterface
   */
  private defineCards(usuario: UsuarioInterface){
    let cardsAux = getCardsByEtapas(usuario.rol, this.etapasDisponibles).slice(1);
    if(usuario.rol == 'admin') this.cards = filtrarLinksPorPermisos(cardsAux, usuario.permisos).concat(GESTIONAR_GRUPOS_ALT);
    else if(usuario.rol == 'root') this.cards = getCardsByEtapas(this._authService.getUsuarioC().rol, this.etapasDisponibles).slice(1);
    else if(usuario.rol == 'aspirante'){
      let resultadosActive = false;
      if ((typeof usuario.estado !== 'undefined') && (typeof usuario.estado.publicacionResultados !== 'undefined'))
        resultadosActive = usuario.estado.publicacionResultados == 'validada';
      this.cards = getCardsByEtapas(this._authService.getUsuarioC().rol, this.etapasDisponibles, resultadosActive).slice(1);
    }
  }
  
  /**
   * Pinta el progreso del alumno en una barra, definiendo su estado
   * Documentacion:
   * Evaluacion:
   * Pagos:
   */
  definirProgreso(){
    const porcentajeUnitario = 100 / Object.keys( this.etapasDisponibles ).length;
    this.etapas = Object.entries( this.etapasDisponibles ).map( ([key, value]:any) => {
      return {
        lugar: value.lugar,
        nombre: value.nombre,
        color: colorEtapas[value.id][this.usuario.estado[value.id]],
        porcentaje: porcentajeUnitario,
        estado: labelEtapas[value.id][this.usuario.estado[value.id]],
        info: `${value.nombre}: Del ${ momentJS(value.fechaInicio).format('Do MMMM YYYY') } al ${ momentJS(value.fechaTermino).format('Do MMMM YYYY') }`
      }
    });
    this.etapas.sort( (a,b) => { return a.lugar - b.lugar });
  }
}

const colorEtapas = {
  'documentacion' : {
    invalida : 'bg-secondary',
    revision : 'bg-info',
    correccion : 'bg-warning',
    validada : 'bg-success'
  },
  'evaluacionConocimientos' : {
    invalida : 'bg-secondary',
    'No válido': 'bg-danger',
    'Válido' : 'bg-success'
  },
  'pago' : {
    invalida : 'bg-secondary',
    revision : 'bg-info',
    correccion : 'bg-warning',
    validada : 'bg-success'
  },
  'publicacionResultados' : {
    invalida : 'bg-secondary',
    validada : 'bg-success',
  }
}

const labelEtapas = {
  'documentacion' : {
    invalida : 'Inválida',
    revision : 'Revisión',
    correccion : 'Necesita corrección',
    validada : 'Validada'
  },
  'evaluacionConocimientos' : {
    invalida : 'Inválida',
    'No válido': 'Nó valido',
    'Válido' : 'Válido'
  },
  'pago' : {
    invalida : 'Inválida',
    revision : 'Revisión',
    correccion : 'Necesita corrección',
    validada : 'Validado'
  },
  'publicacionResultados' : {
    invalida : 'Sin asignación',
    validada : 'Asignado',
  }
}

class EtapaProgress {
  lugar: number;
  nombre: string;
  info: string;
  color: string;
  porcentaje: number;
}