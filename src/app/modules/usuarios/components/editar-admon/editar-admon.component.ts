import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_EDITAR_ADMON } from '@shared/routing-list/ListLinks';
import { ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from '@models/persona/usuario';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { GESTION_USUARIOS, GESTION_ETAPAS, PAGOS, CONVOCATORIA, EVALUACION, DOCUMENTACION } from '@shared/admin-permissions/permissions';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';

@Component({
  selector: 'app-editar-admon',
  templateUrl: './editar-admon.component.html',
  styleUrls: ['./editar-admon.component.scss']
})
export class EditarAdmonComponent implements OnInit {

  usuario: UsuarioInterface;
  gusuarios: boolean = false;
  getapas: boolean = false;
  gpagos: boolean = false;
  gconvocatoria: boolean = false;
  gevaluacion: boolean = false;
  gdocumentacion: boolean = false;
  fgAdmin: FormGroup;

  btnPDisable = true;
  btnIDisable = true;

  constructor(private route: ActivatedRoute, private _personaService: UsuarioService, private _toast:ToastrService,
      private _swal: SweetalertService, private fb: FormBuilder) {
    BreadcrumbComponent.update(BC_EDITAR_ADMON);
    this.usuario = { id: this.route.snapshot.paramMap.get("id") };
  }

  ngOnInit(): void {
    this.fgAdmin = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      apellidos: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]]
    });

    this._personaService.getAdministrador(this.usuario).then((querySnapshot) => {
      let usuario;
      querySnapshot.forEach((user) => {
        usuario = user.data();
      });
      this.usuario = usuario;
      this.configurarPermisos(usuario.permisos);
      this.fgAdmin.get('nombres').setValue(this.usuario.nombres);
      this.fgAdmin.get('apellidos').setValue(this.usuario.apellidos);
    }).catch( err =>  {
      this.mensajeError();
    });
  }

  configurarPermisos(permisos: number){
    this.gusuarios = GESTION_USUARIOS & permisos ? true : false;
    this.getapas = GESTION_ETAPAS & permisos ? true : false;
    this.gpagos = PAGOS & permisos ? true : false;
    this.gconvocatoria = CONVOCATORIA & permisos ? true : false;
    this.gevaluacion = EVALUACION & permisos ? true : false;
    this.gdocumentacion = DOCUMENTACION & permisos ? true : false;
  }

  actualizarPermisos(){
    let permisos = 0;
    permisos += this.gusuarios ? GESTION_USUARIOS : 0;
    permisos += this.getapas ? GESTION_ETAPAS : 0;
    permisos += this.gpagos ? PAGOS : 0;
    permisos += this.gconvocatoria ? CONVOCATORIA : 0;
    permisos += this.gevaluacion ? EVALUACION : 0;
    permisos += this.gdocumentacion ? DOCUMENTACION : 0;
    this._personaService.updatePermisosAdministrador(this.usuario, permisos).then(() => {
      this._swal.informacionAdminActualizada();
    }).catch( err => {
      this._swal.errorActualizarAdmin();
      this.configurarPermisos(this.usuario.permisos);
    });
    this.btnPDisable = true;
  }

  actualizarInformacion(formulario: FormGroup){
    if(formulario.valid){
      let data = formulario.value;
      this._personaService.updateInformacionAdministrador(this.usuario, data).then(() => {
        this._swal.informacionAdminActualizada();
        this.usuario.nombres = data.nombres;
        this.usuario.apellidos = data.apellidos;
      }).catch( err => {
        this._swal.errorActualizarAdmin();
        this.fgAdmin.get('nombres').setValue(this.usuario.nombres);
        this.fgAdmin.get('apellidos').setValue(this.usuario.apellidos);
      });
      this.btnIDisable = true;
    }
  }

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

  getNombreErrorMessage(){
    return this.fgAdmin.get('nombres').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('nombres').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getApellidoErrorMessage(){
    return this.fgAdmin.get('apellidos').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('apellidos').hasError('pattern') ? 'Apellido no valido' :
        '';
  }
}
