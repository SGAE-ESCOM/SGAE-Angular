import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Grupo } from '@models/evaluacion/Grupo';
import { AuthService } from '@services/auth.service';
import { GruposService } from '@services/evaluacion/grupos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_GRUPOS, EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_REQUERIDO } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-inscribir-grupo',
  templateUrl: './main-inscribir-grupo.component.html',
  styleUrls: ['./main-inscribir-grupo.component.scss'],
  animations: [ fadeInRight() ]
})
export class MainInscribirGrupoComponent implements OnInit {

  MSJ_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;

  usuario
  grupos: Grupo[];
  hasGrupo: boolean = false;


  fgInscripcionGrupo: FormGroup;

  constructor(private _authServices: AuthService, private fb: FormBuilder, private router:Router,
    private _toastr: ToastrService, private _swal: SweetalertService,
    private _grupos: GruposService, private _usuarios: UsuarioService) {
    BreadcrumbComponent.update(BC_GRUPOS);
    this.usuario = this._authServices.getUsuarioC();
    this.initForm();
    this.getGrupos();
  }

  ngOnInit() {
  }

  getGrupos() {
    this._grupos.get().subscribe(grupos => this.grupos = grupos);
  }

  /************************* REST *********************/
  inscribir() {
    if (this.fgInscripcionGrupo.valid) {
      this._swal.confirmarFinalizar("¿Finalizar inscripción?", "Recuerda que no podrás cambiar de grupo después de la inscripción").then(accion => {
        if (accion.value) {
          this._usuarios.gasignarGrupo(this.usuario, this.grupo.value ).then(result => {
            this._toastr.success("Inscripción exitosa");
            this.router.navigate([ EVALUACION.url ]);
          })
        }
      })
    } else {
      this._toastr.error("Debes seleccionar al menos un grupo")
    }
  }

  /************************* INIT *********************/
  initForm() {
    this.fgInscripcionGrupo = this.fb.group({
      grupo: ['', Validators.required]
    })
  }

  get grupo() { return this.fgInscripcionGrupo.get('grupo') as FormControl }

}
