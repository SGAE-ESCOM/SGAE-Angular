import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_EDITAR_ADMON, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from '@models/persona/usuario';
import { ToastrService } from 'ngx-toastr';
import { GESTION_USUARIOS, GESTION_ETAPAS, GESTION_PAGOS, GESTION_CONV, GESTION_EVAL, GESTION_DOC, comprobarPermisos } from '@shared/admin-permissions/permissions';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';
import { AdminService } from '@services/admin/admin.service';
import { AuthService } from '@services/auth.service';

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

  constructor(private route: ActivatedRoute, private _adminService: AdminService, private _toast:ToastrService,
      private _swal: SweetalertService, private fb: FormBuilder, private _authServices: AuthService, private router: Router) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    if(comprobarPermisos(usuario, GESTION_USUARIOS, router)){
      BreadcrumbComponent.update(BC_EDITAR_ADMON);
      this.usuario = { id: this.route.snapshot.paramMap.get("id") };
    }
  }

  ngOnInit(): void {
    this.fgAdmin = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      apellidos: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]]
    });

    this._adminService.getAdministrador(this.usuario).then((querySnapshot) => {
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
    this.gpagos = GESTION_PAGOS & permisos ? true : false;
    this.gconvocatoria = GESTION_CONV & permisos ? true : false;
    this.gevaluacion = GESTION_EVAL & permisos ? true : false;
    this.gdocumentacion = GESTION_DOC & permisos ? true : false;
  }

  actualizarPermisos(){
    let permisos = 0;
    permisos += this.gusuarios ? GESTION_USUARIOS : 0;
    permisos += this.getapas ? GESTION_ETAPAS : 0;
    permisos += this.gpagos ? GESTION_PAGOS : 0;
    permisos += this.gconvocatoria ? GESTION_CONV : 0;
    permisos += this.gevaluacion ? GESTION_EVAL : 0;
    permisos += this.gdocumentacion ? GESTION_DOC : 0;
    this._adminService.updatePermisosAdministrador(this.usuario, permisos).then(() => {
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
      this._adminService.updateInformacionAdministrador(this.usuario, data).then(() => {
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
    return this.fgAdmin.get('nombres').hasError('required') ? 'Este campo es requerido' :
      this.fgAdmin.get('nombres').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getApellidoErrorMessage(){
    return this.fgAdmin.get('apellidos').hasError('required') ? 'Este campo es requerido' :
      this.fgAdmin.get('apellidos').hasError('pattern') ? 'Apellido no valido' :
        '';
  }
}
